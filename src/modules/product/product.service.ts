import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductToDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getProductsFromDB = async (productId?: string) => {
  if (productId) {
    const result = await ProductModel.findById(productId);
    return result ? [result] : [];
  } else {
    const result = await ProductModel.find();
    return result;
  }
};

const updateProductInDB = async (productId: string, updateData: Partial<Product>) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    updateData,
    { new: true }
  );
  return updatedProduct;
};

const deleteProductFromDB = async (productId: string)=> {
  const deletedProduct = await ProductModel.findByIdAndDelete(productId);
  return deletedProduct;
};

export const productServices = {
  createProductToDB,
  getProductsFromDB,
  updateProductInDB,
  deleteProductFromDB
};
