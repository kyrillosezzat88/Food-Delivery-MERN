import { z } from "zod";
export const categorySchema = z.object({
  name: z.string().min(3, "Category name must be at least 3 characters long"),
  description: z.string().min(1, "Category description is required").optional(),
  image: z.instanceof(File).optional(),
});
