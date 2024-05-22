import { z } from "zod";

const VariantSchemaValidationZod = z.object({
  type: z
    .string()
    .min(2, "Variant type must be at least 2 characters long")
    .max(50, "Variant type must be less than 50 characters long")
    .trim(),
  value: z
    .string()
    .min(1, "Variant value must be at least 1 character long")
    .max(50, "Variant value must be less than 50 characters long")
    .trim(),
});

const InventorySchemaValidationZod = z.object({
  inStock: z.boolean(),
  quantity: z.number().min(0, "Quantity must be a positive number"),
});

const ProductSchemaValidationZod = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters long")
    .max(100, "Product name must be less than 100 characters long")
    .trim(),
  description: z
    .string()
    .min(10, "Product description must be at least 10 characters long")
    .max(1000, "Product description must be less than 1000 characters long")
    .trim(),
  category: z
    .string()
    .min(3, "Product category must be at least 3 characters long")
    .max(50, "Product category must be less than 50 characters long")
    .trim(),
  price: z.number().min(0, "Price must be a positive number"),
  tags: z.array(z.string().trim()).nonempty("At least one tag is required"),
  inventory: InventorySchemaValidationZod,
  variants: z.array(VariantSchemaValidationZod),
});

export { ProductSchemaValidationZod };
