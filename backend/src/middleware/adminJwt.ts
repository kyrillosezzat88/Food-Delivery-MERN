import Jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const adminJwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Access denied. Admins only" });
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as {
      isAdmin: boolean;
    };
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};
