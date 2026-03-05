import z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  active: z.boolean().optional(),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image file is required")
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
          file.type,
        ),
      "Invalid image type",
    ),
});

export type TCategoryInput = z.infer<typeof categorySchema>;
