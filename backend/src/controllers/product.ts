import type { Request, Response } from "express";
import { Product } from "../modules/product.js";
import { cloudinaryImageUploadMethod } from "../helpers/uploadImageMethod.js";

export const CreateProductController = async (req: Request, res: Response) => {
  try {
    // Check if product with the same name already exists
    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }
    let mainImage;
    let gallery: string[] = [];

    const files = req.files as { [key: string]: { path: string }[] };

    if (files?.mainImage?.[0]) {
      const { path } = files.mainImage[0];
      mainImage = await cloudinaryImageUploadMethod(path);
    }

    if (files?.gallery?.length) {
      for (const file of files.gallery) {
        const newPath = await cloudinaryImageUploadMethod(file.path);
        gallery.push(newPath);
      }
    }
    const newProduct = new Product({
      ...req.body,
      mainImage: mainImage,
      gallery: gallery,
    });

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
    const paginationResult = (req as any).pagination;
    if (!paginationResult) {
      return res
        .status(500)
        .json({ message: "Pagination data missing", status: 500 });
    }

    return res.status(200).json({
      ...paginationResult,
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
      .json({ message: "Product deleted successfully", status: 200, product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error, status: 500 });
  }
};

export const UpdateProductController = async (req: Request, res: Response) => {
  const files = req.files as { [key: string]: { path: string }[] };
  try {
    let mainImage = req.body.mainImage;
    let gallery = req.body.gallery ? JSON.parse(req.body.gallery) : [];

    // upload main image if it's a file
    if (files?.mainImage?.[0]) {
      const { path } = files.mainImage[0];
      mainImage = await cloudinaryImageUploadMethod(path);
    }

    //upload gallery if there are new files
    if (files?.gallery?.length) {
      for (const file of files.gallery) {
        const newPath = await cloudinaryImageUploadMethod(file.path);
        gallery.push(newPath);
      }
    }

    const updateData: any = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      count: req.body.count,
      active: req.body.active,
    };

    if (mainImage) updateData.mainImage = mainImage;
    if (gallery.length > 0) updateData.gallery = gallery;

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
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
