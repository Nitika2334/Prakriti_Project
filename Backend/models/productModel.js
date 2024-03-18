import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: [true],
    enum: ["plant", "accessories"],
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  userRef:{ 
    type: Schema.Types.ObjectId,
    ref: "User",
    required:true,
  },
  productPhoto: {
    type: String,
    required: true
  },
},{
  timestamps:true
}
);

const Product = model('Product', productSchema);

export default Product;
