import express from "express";
import {createProduct, getProduct, getProducts, deleteProduct, updateProduct, getPlantData, getAccessoryData, getAdminProducts, getCartProducts } from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";


const router=express.Router();


router.get("/",getProducts);
router.get("/:id",getProduct);
router.get("/get/plant-data",getPlantData);
router.get("/get/accessory-data",getAccessoryData);
router.get("/get/admin-products",protect,adminOnly,getAdminProducts);
router.get("/get/cart-products",protect,getCartProducts);

router.post("/create-product",protect,adminOnly, createProduct);
router.patch("/update-product/:id",protect,adminOnly, updateProduct);
router.delete("/delete-product/:id",protect,adminOnly, deleteProduct);



export default router;