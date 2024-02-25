//Import necessary modules
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {User} from "../models/userSchema.js";

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
        password,
    });

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


//login user
export const loginUser=asyncHandler(async(req,res)=>{
    res.send("login user.....")
});


// export const registerUser = async (req,res,next) =>{
//     const {name, email, password} = req.body;
//     const hashedPassword = bcryptjs.hashSync(password,10);
//     const newUser = new User({name, email,password:  hashedPassword});

//     try{
//         await newUser.save();
//         res.status(201).json('user created successfully');
//     }catch(error){
//         next(error);
//     }
    
// };
