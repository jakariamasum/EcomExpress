import { z } from "zod";

const OrderSchemaValidationZod = z.object({
  email: z.string().email("Invalid email format"),
  productId: z
    .string()
    .trim()
    .min(24, "Invalid product ID format")
    .max(24, "Invalid product ID format"),
  price: z.number().min(0, "Price must be a positive number"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export { OrderSchemaValidationZod };
