import { z } from "zod";

export const registerValidation = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),

    // address: z.string().min(5, "Address must be at least 5 characters long"),
    // phoneNumber: z
    //   .string()
    //   .min(10, "Phone number must be at least 10 characters long")
    //   .max(15, "Phone number cannot exceed 15 characters")
    //   .regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });
