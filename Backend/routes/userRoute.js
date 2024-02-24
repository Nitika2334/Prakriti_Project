// const express=require("express")
// const router=express.Router();
// const { registerUser } =require("../controllers/userController");

import express from "express";
import {registerUser} from "../controllers/userController.js"
const router=express.Router();

router.post("/register",registerUser);

export default router;