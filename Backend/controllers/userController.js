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
    
    // Check if name, email, password, and role are provided
    if (!name || !email || !password || !role) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    // Check if password meets minimum length requirement
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters long");
    }

    // Check if name contains only letters, spaces, or hyphens
    if (!/^[a-zA-Z\s-]*$/.test(name)) {
        res.status(400);
        throw new Error("Name can only contain letters, spaces, or hyphens");
    }

    // Check if email is valid (You can use a more robust email validation method if needed)
    if (!isValidEmail(email)) {
        res.status(400);
        throw new Error("Invalid email address");
    }

    // Check if email has already been registered
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("Email has already been registered");
    }

    // Create a new user object
    const user = new User({
        name,
        email,
        password,
        role
    });

    try {
        // Save the new user to the database
        await user.save();
    } catch (error) {
        console.log(error);
    }

    // Generate authentication token
    const token = generateToken(user._id);

    // If user is successfully created, send response with user data and token
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

// Function to validate email format and check for negative numbers
function isValidEmail(email) {
    // Use a regular expression or a more comprehensive email validation library
    // This is a basic example, you might want to improve it for production use

    // Check if email contains a negative number
    if (email.includes("-")) {
        return false;
    }

    // Check if email contains spaces
    if (/\s/.test(email)) {
        return false;
    }

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return false;
    }

    // Check if email contains a name before @ symbol
    const atIndex = email.indexOf('@');
    const name = email.substring(0, atIndex);
    if (!/[a-zA-Z]/.test(name)) {
        return false;
    }

    return true;
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

export const addProductToCart = async (req,res) => {
    try{
        const user = await User.findById(req.res.user._id);
        const currentProduct = await Product.findById(req.params.id);
        
        if(!user){
            res.status(400);
            throw new Error("User not found");
        }
        if(!currentProduct){
            res.status(400);
            throw new Error("Product not found");
        }

        if(req.body.quantity > currentProduct.quantity){
            res.status(400);
            throw new Error("Not enough stock");
        }

        let flag=true;
        user.cartItems.forEach( (item) => {
            if( item.product_id.equals(currentProduct._id) ){
                currentProduct.quantity -= req.body.quantity;
                item.quantity+=req.body.quantity;
                user.save();
                currentProduct.save();
                flag=false;
                res.status(200).json(currentProduct);
                return;
            }
        });

        if(flag){
            user.cartItems.push( {product_id : req.params.id , quantity : req.body.quantity} );
            currentProduct.quantity -= req.body.quantity;
            user.save();
            currentProduct.save();
            res.status(200).json(currentProduct);
        }

    }catch(error){
        res.status(400)
        throw new Error("Couldn't add product to the cart");
    }
}

export const removeProductFromCart = asyncHandler(async (req, res) => {
    const user = await User.findById(req.res.user._id).select("-password");
    console.log(req.body.id);
    try{
        const newCartItems = user.cartItems.filter( (item) => item.product_id.toString() !== req.body.id);
        user.cartItems = newCartItems;
        user.save();
        res.status(200).json(newCartItems);
    }catch(error){
        res.status(400)
        throw new Error("Couldn't remove the item from the cart");
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