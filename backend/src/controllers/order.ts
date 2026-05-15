import type { Request, Response } from "express";
import { Order } from "../modules/order.js";
import { calculateOrderTotal } from "../services/calculateOrderTotal.js";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { products, ...rest } = req.body;
    const deliveryCost = 2.99; // This can be dynamic based on address or other factors
    const subtotal = (await calculateOrderTotal(products)).toFixed(2);
    const totalAmount = (parseFloat(subtotal) + deliveryCost).toFixed(2);
    const orderID = `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const order = await Order.create({
      ...rest,
      products,
      subtotal,
      orderID,
      deliveryCost,
      totalAmount,
    });
    res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("user", ["-password", "-isAdmin"])
      .populate("products");
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getOrderByIdController = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", ["-password", "-isAdmin"])
      .populate("products.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateOrderController = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("user", ["-password", "-isAdmin"])
      .populate("products");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res
      .status(200)
      .json({ message: "Order updated successfully", order });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getOrdersByUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const orders = await Order.find({ user: userId })
      .populate("user", ["-password", "-isAdmin"])
      .populate("products");
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
