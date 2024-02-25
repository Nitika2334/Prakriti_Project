import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const protect=asyncHandler(async(req,res,next) =>{
    try {
        const token=req.cookies.token;
        if(!token){
            res.status(401);
            throw new Error("Not authorized, please login");
        }

        //verify token
        const verified=jwt.verify(token, `${process.env.JWT_SECRET}`)
            
        // get user id from token
        const user =await User.findById(verified.id).select("-password")

        if(!user){
            res.status(401);
            throw new Error("User not found");
        }

        next()


    } catch (error) {
        res.status(401);
        throw new Error("Not authorized,please login");
    }
});