import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.string().min(3, "Category is required"),
  mainImage: z.string().url("Invalid image URL").optional(),
  gallery: z.array(z.url("Invalid image URL")).optional(),
});
