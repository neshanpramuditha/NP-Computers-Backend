import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct); //Create------------------------------|
productRouter.get("/", getProducts); //Retrive--------------------------------|
productRouter.get("/trending", (req,res)=>{//                                 |
    res.status(200).json({message:"This is trending products endpoint"})//----|---->CRUD
})//--------------------------------------------------------------------------|
|productRouter.put("/:productID", updateProduct); //Update--------------------|
productRouter.delete("/:productID", deleteProduct); //Delete------------------|
productRouter.get("/:productID",getProductById); 
export default productRouter;