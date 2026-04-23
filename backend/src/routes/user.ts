import { Router } from "express";
import { updateUser } from "../controllers/user.js";
import { userJwtMiddleware } from "../middleware/userJwt.js";

const userRouter = Router();
userRouter.put("/:id", userJwtMiddleware, updateUser);

export default userRouter;
