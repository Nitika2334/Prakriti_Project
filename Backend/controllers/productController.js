import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js"
import { User } from "../models/userSchema.js";


export const createProduct = asyncHandler(async (req, res) => {
    const {
        name, description, price, category, quantity, userRef, productPhoto
    } = req.body;

    // Check if name is provided and is a valid string
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        res.status(400);
        throw new Error("Name must be a valid non-empty string");
    }

    // Check if name contains negative numbers
    if (!/^[a-zA-Z\s-]*$/.test(name)) {
        res.status(400);
        throw new Error("Name can only contain letters, spaces, or hyphens");
    }

    if (!category || !description || !productPhoto || !userRef) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const product = await Product.create({
        name, description, price, category, quantity, userRef, productPhoto
    });

    res.status(201).json(product);
});


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

export const getCartProducts = asyncHandler(async (req, res) => {
    const ids = [];
    const cartItems = req.res.user.cartItems;

    cartItems.forEach((item) => {
        ids.push(item.product_id);
    });

    // Fetch products based on product IDs
    const products = await Product.find({ _id: { $in: ids } });

    if (!products) {
        res.status(400);
        throw new Error("No products found for this user");
    }

    // Map products to include quantity
    const productsWithQuantity = products.map((product) => {
        // Find quantity associated with product ID
        const cartItem = cartItems.find((item) => item.product_id.toString() === product._id.toString());
        // Return object with product data and quantity
        return {
            product: product,
            quantity: cartItem ? cartItem.quantity : 0 // If cartItem exists, return its quantity, otherwise 0
        };
    });

    res.status(200).json(productsWithQuantity);
});


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
        description,price,quantity,productPhoto
    }=req.body;

    try {
        const product=await Product.findById(req.params.id);
        if(product){
            product.description = description || product.description;
            product.price = price || product.price;
            product.quantity = quantity || product.quantity;
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


