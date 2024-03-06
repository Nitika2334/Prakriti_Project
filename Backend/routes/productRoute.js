import express from "express";
import {createProduct, getProducts,getProduct, deleteProduct, updateProduct,deleteReview,reviewProduct, updateReview} from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
const router=express.Router();



router.post("/",protect,adminOnly, createProduct);
router.get("/",getProducts);
router.get("/:id",getProduct)

router.delete("/:id",protect,adminOnly, deleteProduct);
router.patch("/:id",protect,adminOnly, updateProduct);



export default router;