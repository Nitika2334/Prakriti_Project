import express from "express";
import {createProduct, getProduct, getProducts, deleteProduct, updateProduct,deleteReview,reviewProduct, updateReview} from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";


const router=express.Router();


router.get("/",getProducts);
router.get("/:id",getProduct);

router.post("/create-product",protect,adminOnly, createProduct);
router.delete("/:id",protect,adminOnly, deleteProduct);
router.patch("/:id",protect,adminOnly, updateProduct);



export default router;