import asyncHandler from "express-async-handler";


export const createProduct= asyncHandler( async(req,res)=>{
    res.send("Correct")
})

// module.exports={
//     createProduct,
// }