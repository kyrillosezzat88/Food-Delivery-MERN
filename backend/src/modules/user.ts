import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    googleId: { type: String, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    profileImage: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
