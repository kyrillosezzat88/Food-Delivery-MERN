import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    subtotal: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    additionalNotes: { type: String },
    appliedPromo: {
      type: String,
    },
    orderID: { type: String, unique: true, required: true },
    deliveryCost: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
