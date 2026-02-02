import { z } from "zod";

export const orderSchema = z.object({
  user: z.string().refine((val) => {
    return /^[0-9a-fA-F]{24}$/.test(val); // Valid MongoDB ObjectId format
  }, "Invalid user ID format"),
  products: z
    .array(
      z.string().refine((val) => {
        return /^[0-9a-fA-F]{24}$/.test(val); // Valid MongoDB ObjectId format
      }, "Invalid product ID format"),
    )
    .min(1, "At least one product is required")
    .max(50, "Cannot order more than 50 different products"),
  totalAmount: z
    .number()
    .positive("Total amount must be greater than 0")
    .max(10000, "Total amount cannot exceed $10,000"),
  deliveryAddress: z
    .string()
    .min(10, "Delivery address must be at least 10 characters long")
    .max(500, "Delivery address cannot exceed 500 characters"),
  paymentMethod: z.enum(["cash", "card", "online"], {
    message: "Payment method must be 'cash', 'card', or 'online'",
  }),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number cannot exceed 15 characters")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format"),
});
