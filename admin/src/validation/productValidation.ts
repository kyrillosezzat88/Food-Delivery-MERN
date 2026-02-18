import { z } from "zod";

export const productSchema = z.object({
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
    .array(z.string())
    .default([])
    .refine(
      (val) =>
        val.every(
          (item) =>
            item.startsWith("data:image/") ||
            item.startsWith("http://") ||
            item.startsWith("https://"),
        ),
      "Gallery items must be valid image URLs or data URLs",
    )
    .refine((val) => val.length > 0, "At least one product image is required"),
});

export type TProductInput = z.infer<typeof productSchema>;
