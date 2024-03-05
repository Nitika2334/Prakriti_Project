import express from "express";
import {createProduct, getProducts,getProduct, deleteProduct, updateProduct,deleteReview,reviewProduct, updateReview} from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
const router=express.Router();



router.post("/",protect,adminOnly, createProduct);
router.get("/",getProducts);
router.get("/:id",getProduct)
router.post("/:id",protect,adminOnly, deleteProduct);
router.patch("/:id",protect,adminOnly, updateProduct);
router.patch("/review/:id",protect,reviewProduct);
router.patch("/deleteReview/:id",protect,deleteReview);
router.patch("/updateReview/:id",protect,updateReview);


export default router;