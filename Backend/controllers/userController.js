// Import necessary modules
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { User } from "../models/userSchema.js";

// Function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
        expiresIn: "1d"
    });
}

// Register user route
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters long");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("Email has already been registered");
    }

    // Create new user
    const user = new User({
        name,
        email,
        password
    });

    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }

    // Generate token
    const token = generateToken(user._id);

    if (user) {
        const { _id, name, email, role } = user;
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure:true,
            // samesite:none,
        });

        // Send user data
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

// Login user route
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid credentials"));
        const token = jwt.sign({ id: validUser._id }, `${process.env.JWT_SECRET}`);
        const rest = { ...validUser._doc };
        delete rest.password;
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

// Logout user route
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        // secure:true,
        // samesite:none,
    });
    return res.status(200).json({ message: "Successfully logged out" });
});

// Get user details route
export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

// Middleware to handle errors
const errorHandler = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

// Update user details route
export const updateUser = asyncHandler(async (req, res,next) => {
    const { name, phone, address } = req.body;
    try {
        const user = await User.findById(req.user._id);
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

// Check login status route
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

// Update user photo route
export const updatePhoto = asyncHandler(async (req, res) => {
    // // Logic to update user's photo
    // res.send("Photo updated successfully");
    const {photo}=req.body;
    const user=await User.findById(req.user._id);
    user.photo=photo
    const updatedUser=await user.save();
    res.status(200).json(updatedUser);
});
