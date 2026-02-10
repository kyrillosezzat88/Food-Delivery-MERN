import type { Request, Response } from "express";
import { Category } from "../modules/category.js";

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    //check if category already exists
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = new Category(req.body);
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
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", status: 404 });
    }
    return res
      .status(200)
      .json({ message: "Category deleted successfully", status: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error, status: 500 });
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", status: 404 });
    }
    return res
      .status(200)
      .json({
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
