import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductToDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getProductsFromDB = async (searchTerm?: string) => {
  let products;
  if (searchTerm) {
    const regex = new RegExp(searchTerm as string, "i");
    products = await ProductModel.find({
      $or: [{ name: regex }, { description: regex }, { category: regex }],
    });
  } else {
    products = await ProductModel.find();
  }
  return products;
};

const updateProductInDB = async (
  productId: string,
  updateData: Partial<Product>
) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    updateData,
    { new: true }
  );
  return updatedProduct;
};

const deleteProductFromDB = async (productId: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(productId);
  return deletedProduct;
};

export const productServices = {
  createProductToDB,
  getProductsFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
