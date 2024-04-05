import express from "express";
import {getUser, loginUser, logoutUser, registerUser, getLoginStatus, updateUser, updatePhoto, addProductToCart, removeProductFromCart} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router();

router.get("/logout",logoutUser);
router.get("/getLoginStatus",getLoginStatus);
router.get("/getUser",protect, getUser);

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/add-to-cart/:id",protect,addProductToCart);

router.patch("/updateUser",protect, updateUser);
router.patch("/updatePhoto",protect,updatePhoto);
router.patch("/remove-cart-product",protect,removeProductFromCart);


export default router;