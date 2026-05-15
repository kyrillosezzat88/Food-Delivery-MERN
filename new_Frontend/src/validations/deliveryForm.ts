import { z } from "zod";

export const deliveryFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number cannot exceed 15 characters")
    .regex(/^\+?[\d\s\-()]+$/, "Invalid phone number format"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot exceed 200 characters"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City cannot exceed 50 characters"),
  zip: z
    .string()
    .min(5, "ZIP code must be at least 5 characters")
    .max(10, "ZIP code cannot exceed 10 characters")
    .regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid ZIP code format (e.g., 12345 or 12345-6789)",
    ),
});

export type DeliveryFormErrors = {
  [K in keyof z.infer<typeof deliveryFormSchema>]?: string;
};
