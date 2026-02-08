import type { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";

export interface PaginationResult<T> {
  currentPage: number;
  limit: number;
  TotalRecords: number;
  totalPages: number;
  data: T[];
}

export function paginate<T extends Document>(model: Model<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (currentPage - 1) * limit;

    try {
      const TotalRecords = await model.countDocuments();
      const data = await model.find().skip(skip).limit(limit);

      const result: PaginationResult<T> = {
        currentPage,
        limit,
        TotalRecords,
        totalPages: Math.ceil(TotalRecords / limit),
        data,
      };

      (req as any).pagination = result;

      next();
    } catch (err) {
      next(err);
    }
  };
}
