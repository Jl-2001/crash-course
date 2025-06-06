import express from "express";
import dotenv from "dotenv";
//^imports the dotenv file because otherwise, the callback will be undefine
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
app.use(express.json()); // allows use to accept json data in a body

//created a products route
app.get("/products", (req, res) => {
  res.send("server is done hehe");
});

app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.send(400).json({
      succes: false,
      message: "Please provide the required info needed"
    });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ succes: true, data: newProduct });
  } catch (error) {
    console.error("error in the POST product:", error.message);
    res.status(500).json({ succes: false, message: "server error" });
  }
});

app.listen(5003, () => {
  connectDB(); // this will call from the DB.js file to listen to the DB
  console.log(`server started at localhost: no`);
});
