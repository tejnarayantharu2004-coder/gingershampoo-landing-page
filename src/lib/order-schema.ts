import { z } from "zod";

export const orderSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),
  phone: z.string().trim().min(1, "Phone number is required"),
  email: z.string().trim().email("Email must be valid"),
  location: z.string().trim().min(1, "Exact location is required"),
  productName: z.string().trim().min(1, "Product name is required"),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  pricePerPiece: z.coerce.number().positive("Price per piece must be valid"),
  totalPrice: z.coerce.number().positive("Total price must be valid")
});

export type OrderInput = z.infer<typeof orderSchema>;
