import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js"
import { User } from "../models/userSchema.js";


export const createProduct= asyncHandler( async(req,res)=>{
    const {
        name,description,price,category,quantity,userRef,productPhoto
    }=req.body;

    if(!name ||!category || !description || !productPhoto || !userRef){
        res.status(400);
        throw new Error("Please fill an all fields")
    }

    const product=await Product.create({
        name,description,price,category,quantity,userRef,productPhoto
    })

    const admin=await User.findById(userRef);
    if(admin){
        admin.listedItems.push(product);
        admin.save();
    }

    res.status(201).json(product)
})


export const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find().sort("-createdAt");
    if(!products){
        res.status(400);
        throw new Error("Products not found.")
    }
    res.status(200).json(products)
    
})


export const getProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        res.status(400);
        throw new Error("Product not found.")
    }
    res.status(200).json(product)
})



export const getPlantData=asyncHandler(async(req,res)=>{
    const products=await Product.find({category:"plant"});
    if(!products){
        res.status(400);
        throw new Error("Products not found.")
    }

    res.status(200).json(products);
})

export const getAccessoryData=asyncHandler(async(req,res)=>{
    const products=await Product.find({category:"accessories"});
    if(!products){
        res.status(400);
        throw new Error("Products not found.")
    }

    res.status(200).json(products);
})

export const getAdminProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({userRef:req.res.user._id});
    if(!products){
        res.status(400);
        throw new Error("Products not found.")
    }

    res.status(200).json(products);
})


export const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        res.status(400);
        throw new Error("Product not found.")
    }
    await Product.findByIdAndDelete(req.params.id) 
    res.status(200).json({message:"Product Deleted"});
});


export const updateProduct=asyncHandler(async(req,res)=>{
    const {
        name,description,price,category,quantity,productPhoto
    }=req.body;

    try {
        const product=await Product.findById(req.params.id);
        if(product){
            product.name=name || product.name;
            product.description=description || product.description;
            product.price=price || product.price;
            product.category=category || product.category;
            product.quantity=quantity || product.quantity;
            product.productPhoto=productPhoto || product.productPhoto;
            const updatedProduct=await product.save();
            res.status(200).json(updatedProduct);
        }
        else{
            res.status(404);
            throw new Error("Product not found");
        }
    } catch (error) {
        next(error);
    }
});


