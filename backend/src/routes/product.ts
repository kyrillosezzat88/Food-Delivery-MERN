import { Router } from "express";
import { validate } from "../middleware/validation.js";
import { productSchema } from "../validations/product.js";
import {
  CreateProductController,
  DeleteProductController,
  GetProductByIdController,
  GetProductsController,
  UpdateProductController,
} from "../controllers/product.js";
import { adminJwtMiddleware } from "../middleware/adminJwt.js";

const productRouter = Router();

productRouter.post(
  "/",
  adminJwtMiddleware,
  validate(productSchema),
  CreateProductController,
);

productRouter.get("/", GetProductsController);
productRouter.get("/:id", GetProductByIdController);
productRouter.put(
  "/:id",
  adminJwtMiddleware,
  validate(productSchema),
  UpdateProductController,
);
productRouter.delete("/:id", adminJwtMiddleware, DeleteProductController);

export default productRouter;
