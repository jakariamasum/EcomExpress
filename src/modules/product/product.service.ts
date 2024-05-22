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

const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};
const getSingleProductByNameFromDB = async (productName: string) => {
  const result = await ProductModel.findOne({ name: productName });
  return result;
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

const updateProductInventory = async (productId: string, quantity: number) => {
  const product = await ProductModel.findById(productId);
  if (product) {
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();
  }
  return product;
};

const deleteProductFromDB = async (productId: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(productId);
  return deletedProduct;
};

export const productServices = {
  createProductToDB,
  getProductsFromDB,
  getSingleProductFromDB,
  getSingleProductByNameFromDB,
  updateProductInDB,
  deleteProductFromDB,
  updateProductInventory,
};
