import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js"
import errorHandler from "./middleware/errorMiddleware.js";
dotenv.config();
mongoose.set('strictQuery', false);

mongoose
.connect("mongodb+srv://nitikaruhal1503:MElzF3RDGbKMP2mH@cluster0.a1kprfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0s")
.then(()=>{
    console.log("db connected");
    //error middleware
    app.use(errorHandler);
    //port
    const PORT=process.env.PORT || 4000;
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`)
    })
})
.catch((err)=>
console.log(`db connection failed : ${err}`))

const app=express()

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:["http://localhost:3000","https://prakriti.vercel.app"],
        credentials:true, 
    })

)

//routes
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.get("/",(req,res)=>{
    res.send("home page...");
})

