import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

export const Order = mongoose.model("Order", orderSchema);
