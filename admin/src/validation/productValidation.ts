import { z } from "zod";

export const productSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  count: z
    .number()
    .int()
    .nonnegative("Count must be a non-negative integer")
    .optional(),
  active: z.boolean().optional(),
  gallery: z
    .array(
      z.union([
        z
          .instanceof(File)
          .refine((file) => file.size > 0, "Image file is required")
          .refine(
            (file) =>
              ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
                file.type,
              ),
            "Invalid image type",
          ),
        z.string().min(1, "Image URL is required"),
      ]),
    )
    .min(1, "At least one image is required"),
});

export type TProductInput = z.infer<typeof productSchema>;
