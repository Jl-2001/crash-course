import express, { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import {
  deleteProduct,
  getProducts,
  postProducts,
  updateProducts
} from "../controllers/product.controller.js";

const router = express.Router();

//created a products route
router.get("/", getProducts);

router.post("/", postProducts);

router.put("/:id", updateProducts);
//app.patch is used to only update some fields in the id specified

router.delete("/:id", deleteProduct);

export default router;
