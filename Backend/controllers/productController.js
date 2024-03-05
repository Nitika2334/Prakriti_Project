import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
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
});

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
    //update product
    const updatedProduct=await Product.findByIdAndUpdate(
        {_is:req.params.id},
        {
            name,category,brand,quantity,price,description,image,egularPrice,color,
        },
        {
            new:true,
            runVaidators:true,
        }
    )
    res.status(200).json(updatedProduct);
});

//Review Product
export const reviewProduct=asyncHandler(async(req,res)=>{
    //res.send("Correct");
    const {star,review,reviewDate}=req.body;
    const {id} =req.params

    //Validations
    if(star<1 || !review){
        star.status(400);
        throw new Error("Please add a star and review");
    }
    const product=Product.findById(id)

    if(!product){
        res.status(400);
        throw new Error("Product not found");
    }

    //update ratings
    product.ratings.push(
        {
            star,
            review,
            reviewDate,
            name:req.ser.name,
            userId:req.user._id,
        }
    )
    product.save()
    res.send(400).json({message:"Product review added."})
});

//Delete review
export const deleteReview=asyncHandler(async(req,res)=>{
    const {userId} =req.body
    const product=await Product.findById(id);

    if(!product){
        res.status(400);
        throw new Error("Product new ")
    }

    const newRatings=product.ratings.filter((rating)=>{
        return rating.userId.toString()!==userId.toString()
    })
    product.ratings=newRatings
    product.save()
    res.send(200).json({message:"Product review Deleted"})
});

//update review
export const updateReview=asyncHandler(async(req,res)=>{
    const {star,review,reviewDate,userId}=req.body;
    const {id} =req.params;

    //Validations
    if(star<1 || !review){
        star.status(400);
        throw new Error("Please add a star and review");
    }
    const product=Product.findById(id)

    if(!product){
        res.status(400);
        throw new Error("Product not found");
    }

    //match the user to review
    if(req.user.toString()!==userId){
        res.send(401)
        throw new Error({message:"User not authorized"})
    }

    //update roduct review
    const updatedReview=await Product.findOneAndUpdate({
        _id : product._id,
        "rating.userId": mongoose.Types.ObjectId(userId)
    },
    {
        $set:{
            "ratings.$.star":star,
            "ratings.$.review":review,
            "ratings.$.reviewDate":reviewDate,
        }
    })
    if(updateReview){
        res.send(200).json({message:"Product review updated."})
    }else{
        res.send(400).json({message:"Product review NOT updated."})
    }
});

// module.exports={
//     createProduct,
// }