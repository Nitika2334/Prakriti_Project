// const express=require("express")
// const router=express.Router();
// const { registerUser } =require("../controllers/userController");

import express from "express";
import {getUser, loginUser, logoutUser, registerUser,getLoginStatus,updateUser,updatePhoto} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.get("/getUser",protect, getUser);
router.get("/getLoginStatus",getLoginStatus);

router.patch("/updateUser",protect, updateUser);
router.patch("/updatePhoto",protect,updatePhoto);

export default router;