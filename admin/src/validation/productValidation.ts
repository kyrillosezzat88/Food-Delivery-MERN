import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .number("Price must be a number")
    .positive("Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  count: z
    .number()
    .int()
    .nonnegative("Count must be a non-negative integer")
    .optional(),
  active: z.boolean().optional(),
  gallery: z
    .array(
      z
        .string()
        .refine(
          (val) =>
            val.startsWith("data:") ||
            val.startsWith("http://") ||
            val.startsWith("https://"),
          "Gallery items must be valid data URLs or HTTP(S) URLs",
        ),
    )
    .min(1, "At least one product image is required"),
});

export type TProductInput = z.infer<typeof productSchema>;
