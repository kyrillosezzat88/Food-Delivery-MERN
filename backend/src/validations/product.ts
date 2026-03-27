import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.string().min(3, "Category is required"),
  mainImage: z
    .union([
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
      z.string().url("Invalid image URL"),
    ])
    .optional(),
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
        z.string().url("Invalid image URL"),
      ]),
    )
    .optional(),
});
