import { Router } from "express";
import { validate } from "../middleware/validation.js";
import {
  createOrderController,
  deleteOrderController,
  getOrderByIdController,
  getOrdersController,
  updateOrderController,
  getOrdersByUserController,
} from "../controllers/order.js";
import { userJwtMiddleware } from "../middleware/userJwt.js";
import { orderSchema } from "../validations/order.js";
import { adminJwtMiddleware } from "../middleware/adminJwt.js";

const orderRouter = Router();

orderRouter.post(
  "/",
  userJwtMiddleware,
  validate(orderSchema),
  createOrderController,
);

orderRouter.get("/", adminJwtMiddleware, getOrdersController);
orderRouter.get("/user/:userId", userJwtMiddleware, getOrdersByUserController);
orderRouter.get("/:id", userJwtMiddleware, getOrderByIdController);
orderRouter.put("/:id", userJwtMiddleware, updateOrderController);
orderRouter.delete("/:id", userJwtMiddleware, deleteOrderController);

export default orderRouter;
