import { Router } from "express";
import { validate } from "../middleware/validation.js";
import { categorySchema } from "../validations/category.js";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  updateCategoryController,
} from "../controllers/category.js";
import { adminJwtMiddleware } from "../middleware/adminJwt.js";

const categoryRouter = Router();

categoryRouter.post(
  "/",
  adminJwtMiddleware,
  validate(categorySchema),
  createCategoryController,
);

categoryRouter.put(
  "/:id",
  adminJwtMiddleware,
  validate(categorySchema),
  updateCategoryController,
);

categoryRouter.delete("/:id", adminJwtMiddleware, deleteCategoryController);

categoryRouter.get("/", getCategoriesController);

export default categoryRouter;
