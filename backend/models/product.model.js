import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // created at, updated at
  }
);
//make sure that each word is correctly spelled

const Product = mongoose.model("Product", productSchema);
//Product will be called singular here but in the mongoose db itll change to products.

export default Product;
