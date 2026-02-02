import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  profileImage: { type: String },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
