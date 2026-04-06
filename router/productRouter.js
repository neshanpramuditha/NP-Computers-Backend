import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, searchProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct); //Create------------------------------|
productRouter.get("/", getProducts); //Retrive--------------------------------|
productRouter.get("/search/:query", searchProducts); //Search-----------------|
//                                                                            |------CRUD Operations
productRouter.put("/:productID", updateProduct); //Update---------------------|
productRouter.delete("/:productID", deleteProduct); //Delete------------------|
productRouter.get("/:productID",getProductById); 
export default productRouter;