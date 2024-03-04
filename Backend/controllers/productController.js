import asyncHandler from "express-async-handler";
// import Product from "../models/productModel.js"


export const createProduct= asyncHandler( async(req,res)=>{
    // res.send("Correct")
    const {
        name,sku,category,brand,quantity,price,description,image,egularPrice,color,
    }=req.body;

    if(!name ||!category || !brand || !quantity ||!price || !description){
        res.send(400);
        throw new Error("Please fill an all fields")
    }

    const product=await Product.create({
        name,sku,category,brand,quantity,price,description,image,egularPrice,color,
    })
    
    res.status(201).json(product)
})

//get product
export const getProducts=asyncHandler(async(req,res)=>{
    // res.send("Correct")
    const products=await Product.find().sort("-createdAt")
    res.status(200).json(products)

})

//get single product
export const getProduct=asyncHandler(async(req,res)=>{
    // res.send("Correct")
    const product=await Product.findById(req.params.id);
    if(!product){
        res.send(400);
        throw new Error("Product not found.")
    }
    res.status(200).json(product)
})

//delete product
export const deleteProduct=asyncHandler(async(req,res)=>{
    // res.send("Correct");
    const product=await Product.findById(req.params.id);
    if(!product){
        res.send(400);
        throw new Error("Product not found.")
    }
    await Product.findByIdAndDelete(req.params.id) 
    res.status(200).json({message:"Product Deleted"});
})

//update product

export const updateProduct=asyncHandler(async(req,res)=>{
    //res.send("Correct");
    const {
        name,category,brand,quantity,price,description,image,egularPrice,color,
    }=req.body;

    const product=await Product.findById(req.params.id);
    if(!product){
        res.send(400);
        throw new Error("Product not found.")
    }
})

// module.exports={
//     createProduct,
// }