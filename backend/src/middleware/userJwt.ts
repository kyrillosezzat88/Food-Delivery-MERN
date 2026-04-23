import JWT from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { User } from "../modules/user.js";

export const userJwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Access denied. Please log in." });
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET as string) as any;
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};
