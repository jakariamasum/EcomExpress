import { Schema, model } from "mongoose";
import { Inventory, Product, Variant } from "./product.interface";

const VariantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: [true, "Variant type is required"],
  },
  value: {
    type: String,
    required: [true, "Variant value is required"],
  },
});

const InventorySchema = new Schema<Inventory>({
  inStock: {
    type: Boolean,
    required: [true, "In-stock status is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
});

const productSchema = new Schema<Product>({
  name: {
    type: String,
    unique: true,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  tags: {
    type: [String],
    required: [true, "Product tags are required"],
  },
  variants: {
    type: [VariantSchema],
    required: [true, "Product variants are required"],
  },
  inventory: {
    type: InventorySchema,
    required: [true, "Inventory information is required"],
  },
});

export const ProductModel = model<Product>("Product", productSchema);
