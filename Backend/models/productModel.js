import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name:{
    type:String,
    required: [true,"Please add a name"],
    trim:true,
  },
  //stock keeping unit
  sku:{
    type:String,
    required:true,
    default:"sku",
    trim:true,
  },
  category:{
    type:String,
    required:[true,"Please add a category"],
    trim:true,
  },
  brand:{
    type:String,
    required:[true,"Please add a category"],
    trim:true,
  },
  color:{
    type:String,
    required:[true,"Please add a season/color"],
    default:"As seen",
    trim:true,
  },
  quantity:{
    type:String,
    required:[true,"Please add a category"],
    trim:true,
  },
  sold:{
    type:Number,
    default:0,
    trim:true,
  },
  regularPrice:{
    type:Number,
    // required:[true,"Please add a category"],
    trim:true,
  },
  price:{
    type:Number,
    required:[true,"Please add a price"],
    trim:true,
  },
  description:{
    type:String,
    required:[true,"Please add a category"],
    trim:true,
  },
  image:{
    type:[String],
  },
  ratings:{
    type:[Object],
  },
},

{timestamp:true,}

)


const Product=mongoose.model("Product",productSchema);

module.exports=Product;