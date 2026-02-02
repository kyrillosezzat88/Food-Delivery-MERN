import JWT from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const userJwtMiddleware = (
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
    JWT.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};
