import z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  active: z.boolean().optional(),
  image: z.string().optional(),
});

export type TCategoryInput = z.infer<typeof categorySchema>;
