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


//login user
export const loginUser = async(req,res,next) => {
    const {email, password } = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,"user not found"));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,"wrong credentials"));
        const token = jwt.sign({id: validUser._id}, `${process.env.JWT_SECRET}`);
        const rest={...validUser._doc};
        delete rest.password;
        res
        .cookie('access_token',token,{httpOnly: true})
        .status(200)
        .json(rest)
    }catch(error){
        next(error)
    }
};

export const logoutUser=asyncHandler(async (req,res)=>{
    // res.send("Logout");
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        // secure:true,
        // samesite:none,
    });
    return res.status(200).json({message: "Successfully Logged Out"});
});

const errorHandler=(statusCode, message)=>{
    const error=new Error();
    error.statusCode=statusCode;
    error.message=message;
    return error;
};

// export const loginUser=asyncHandler(async(req,res)=>{
//     const {email,password} =req.body;

//     //Validate Request
//     if(!email || !password){
//         res.status(400);throw new Error("Please add email and password")
//     }

//     //check if user exists
//     const userE = await User.findOne({ email });

//     //user password, check if the password is correct
//     const passwordIsCorrect= bcryptjs.compareSync(password,User.password)

//     //Generate token
//     const token = generateToken(userE._id);
//     const newUser = await User.findOne({ email }).select("-password");
//     if(userE && passwordIsCorrect){
//         res.cookie("token", token, {
//             path: "/",
//             httpOnly: true,
//             expires: new Date(Date.now() + 1000 * 86400),
//             // secure:true,
//             // samesite:none,
//         });

//         // Send user data
//         res.status(201).json(newUser);
//     }
//     else{
//         res.status(400);
//         throw new Error("Invalid email or password");
//     }

// });


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
