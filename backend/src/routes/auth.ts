import { Router } from "express";
import { validate } from "../middleware/validation.js";
import { loginValidation } from "../validations/login.js";
import {
  googleCallback,
  LoginController,
  RegisterController,
  VerifyEmailController,
  getCurrentUser,
} from "../controllers/auth.js";
import { registerValidation } from "../validations/register.js";
import passport from "passport";
import { userJwtMiddleware } from "../middleware/userJwt.js";

const authRouter = Router();

authRouter.post("/login", validate(loginValidation), LoginController);
authRouter.post("/register", validate(registerValidation), RegisterController);
authRouter.post("/verify-email", VerifyEmailController);
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  googleCallback,
);
authRouter.get("/me", userJwtMiddleware, getCurrentUser);
export default authRouter;
