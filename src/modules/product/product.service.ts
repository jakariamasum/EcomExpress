import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductToDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getProductsFromDB = async (searchQuery?: string) => {
  if (searchQuery) {
    const result = await ProductModel.findById(searchQuery);
    return result ? [result] : [];
  } else {
    const result = await ProductModel.find();
    return result;
  }
};

export const productServices = {
  createProductToDB,
  getProductsFromDB,
};
