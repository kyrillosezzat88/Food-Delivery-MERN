import type { Request, Response } from "express";
import { Category } from "../modules/category.js";
import cloudinary from "../services/cloudinary.js";
import { Product } from "../modules/product.js";

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const image = req.file;
    //check if category already exists
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }
    let categoryImage;
    if (image) {
      categoryImage = await cloudinary.uploader.upload(image.path, {
        folder: "categories",
        public_id: `${Date.now()}`,
      });
    }

    const newCategory = new Category({
      ...req.body,
      image: categoryImage ? categoryImage.secure_url : "",
    });

    await newCategory.save();
    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
      status: 201,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getCategoriesController = async (req: Request, res: Response) => {
  try {
    const paginationData = (req as any).pagination;
    return res.status(200).json(paginationData);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
export const getCategoryByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", status: 404 });
    }
    return res.status(200).json({ category, status: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error, status: 500 });
  }
};
export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).json({
        status: 400,
        message: "Category ID is required",
      });
    }

    // 1) Delete category and return deleted doc
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }

    // 2) Delete related products
    await Product.deleteMany({ category: categoryId });

    return res.status(200).json({
      status: 200,
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      error: (error as Error).message,
    });
  }
};
export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const image = req.file;
    let categoryImage;
    if (image) {
      categoryImage = await cloudinary.uploader.upload(image.path, {
        folder: "categories",
        public_id: `${Date.now()}`,
      });
    }
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: categoryImage ? categoryImage.secure_url : req.body.image,
      },
      {
        new: true,
      },
    );
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", status: 404 });
    }
    return res.status(200).json({
      message: "Category updated successfully",
      category,
      status: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error, status: 500 });
  }
};
