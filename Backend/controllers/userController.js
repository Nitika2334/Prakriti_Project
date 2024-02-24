// const asyncHandler=require("express-async-handler");
import asyncHandler from "express-async-handler";


//Register user
export const registerUser=asyncHandler(async(req,res)=>{
    res.send("Register User.....");
});

