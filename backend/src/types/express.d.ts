import type { Request } from "express";
import type { User } from "./modules/user.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
