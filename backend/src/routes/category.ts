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
import { paginate } from "../middleware/pagination.js";
import { Category } from "../modules/category.js";
import uploadImage from "../middleware/uploadImage.js";

const categoryRouter = Router();

categoryRouter.post(
  "/",
  adminJwtMiddleware,
  // validate(categorySchema),
  uploadImage.single("image"),
  createCategoryController,
);

categoryRouter.put(
  "/:id",
  adminJwtMiddleware,
  // validate(categorySchema),
  uploadImage.single("image"),
  updateCategoryController,
);

categoryRouter.delete("/:id", adminJwtMiddleware, deleteCategoryController);

categoryRouter.get("/", paginate(Category), getCategoriesController);

export default categoryRouter;
