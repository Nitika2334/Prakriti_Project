import express from "express";
import {createProduct, getProduct, getProducts, deleteProduct, updateProduct, getPlantData, getAccessoryData, getAdminProducts } from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";


const router=express.Router();


router.get("/",getProducts);
router.get("/:id",getProduct);
router.get("/get/plant-data",getPlantData);
router.get("/get/accessory-data",getAccessoryData);
router.get("/get/admin-products",protect,adminOnly,getAdminProducts);

router.post("/create-product",protect,adminOnly, createProduct);
router.delete("/:id",protect,adminOnly, deleteProduct);
router.patch("/:id",protect,adminOnly, updateProduct);



export default router;