import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      required: [true],
      default: "admin",
      enum: ["customer", "admin"],
    },
    photo: {
      type: String,
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+234",
    },
    address: {
      type: Object,
      // address, state, country
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    balance: {
      type: Number,
      default: 0,
    },
    cartItems: {
      type: [Object],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    stripeCustomerId: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving to DB
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

export const User = model("user", userSchema);
