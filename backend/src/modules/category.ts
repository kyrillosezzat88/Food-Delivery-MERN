import { Schema, model, Document } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  ImageUrl?: string;
}

const categorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  ImageUrl: { type: String },
});

export const Category = model<CategoryDocument>("Category", categorySchema);
