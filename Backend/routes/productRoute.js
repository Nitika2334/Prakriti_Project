import express from "express";
import {createProduct} from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
const router=express.Router();



router.post("/",protect,adminOnly, createProduct);


export default router;