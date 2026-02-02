import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate = <T extends z.ZodTypeAny>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      } else {
        next(error);
      }
    }
  };
};
