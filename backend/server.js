import express from "express";
import dotenv from "dotenv";
//^imports the dotenv file because otherwise, the callback will be undefine
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
app.use(express.json()); // allows use to accept json data in a body
app.use("/api/products", productRoutes);

app.listen(5003, () => {
  connectDB(); // this will call from the DB.js file to listen to the DB
  console.log(`server started at localhost: 5003`);
});
