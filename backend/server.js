import express from "express";
import dotenv from "dotenv";
//^imports the dotenv file because otherwise, the callback will be undefine
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json()); // allows use to accept json data in a body

//created a products route
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in the get request"
    });
  }
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
  console.log(product);
  try {
    await newProduct.save();
    res.status(201).json({ succes: true, data: newProduct });
  } catch (error) {
    console.error("error in the POST product:", error.message);
    res.status(500).json({ succes: false, message: "server error" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
//app.patch is used to only update some fields in the id specified

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {
    console.log("error in deleting product");
    res.status(404).json({ success: false, message: "product ID not found" });
  }
});

app.listen(5003, () => {
  connectDB(); // this will call from the DB.js file to listen to the DB
  console.log(`server started at localhost: no`);
});
