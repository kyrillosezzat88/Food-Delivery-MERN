import type { Request, Response } from "express";
import { Product } from "../modules/product.js";

export const CreateProductController = async (req: Request, res: Response) => {
  try {
    // Check if product with the same name already exists
    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const newProduct = new Product(req.body);
    await newProduct.save();
    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
      status: 201,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const GetProductsController = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("category");
    return res.status(200).json({
      products,
      status: 200,
      message: "Products fetched successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error, status: 500 });
  }
};

export const GetProductByIdController = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", status: 404 });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error, status: 500 });
  }
};

export const DeleteProductController = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", status: 404 });
    }
    return res
      .status(200)
      .json({ message: "Product deleted successfully", status: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error, status: 500 });
  }
};

export const UpdateProductController = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("category");
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", status: 404 });
    }
    return res
      .status(200)
      .json({ message: "Product updated successfully", product, status: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error, status: 500 });
  }
};
