import { Router } from "express";
import { validate } from "../middleware/validation.js";
import { loginValidation } from "../validations/login.js";
import { LoginController, RegisterController } from "../controllers/auth.js";
import { registerValidation } from "../validations/register.js";

const authRouter = Router();

authRouter.post("/login", validate(loginValidation), LoginController);
authRouter.post("/register", validate(registerValidation), RegisterController);

export { authRouter };
