// Import necessary modules
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import Product from "../models/productModel.js";

const generateToken = (id) => {
    return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
        expiresIn: "1d"
    });
}


export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters long");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("Email has already been registered");
    }

    const user = new User({
        name,
        email,
        password,
        role
    });

    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }

    const token = generateToken(user._id);

    if (user) {
        const { _id, name, email, role } = user;
        res.cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 86400),
        });

        res.status(201).json({
            _id,
            name,
            email,
            role,
            token
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


export const addProductToCart = async (req,res) => {
    try{
        const user = await User.findById(req.res.user._id);
        const product = await Product.findById(req.params.id);
        
        if(!user){
            res.status(400);
            throw new Error("User not found");
        }
        if(!product){
            res.status(400);
            throw new Error("Product not found");
        }

        user.cartItems.push(req.params.id,req.body.quantity);
        const newQuantity=product.quantity - req.body.quantity;
        product.quantity=newQuantity;
        user.save();
        product.save();

        console.log(user);
        console.log(product);

        res.status(200);

    }catch(error){
        res.status(400)
        throw new Error("Couldn't add product to the cart");
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    const user = await User.findOne({email}).select("-password");
    
    if (user) {
        const token = generateToken(user._id);
        res.cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 86400),
        });
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error("User doesn't exist...");
    }
};


export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Successfully logged out" });
});


export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.res.user._id).select("-password");
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});



export const updateUser = asyncHandler(async (req, res,next) => {
    const { name, phone, address } = req.body;
    console.log(req.body);
    try {
        const user = await User.findById(req.res.user._id);
        if (user) {
            user.name = name || user.name;
            user.phone = phone || user.phone;
            user.address = address || user.address;
            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        next(error);
    }
});


export const getLoginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }
    try {
        const verified = jwt.verify(token, `${process.env.JWT_SECRET}`);
        if (verified) {
            res.json(true);
        } else {
            res.json(false);
        }
    } catch (error) {
        res.json(false);
    }
});

export const updatePhoto = asyncHandler(async (req, res) => {
    const {photo}=req.body;
    const user=await User.findById(req.res.user._id);
    user.photo=photo
    const updatedUser=await user.save();
    res.status(200).json(updatedUser);
});
