import { Request, Response } from "express";
import { productServices } from "./product.service";
import { ProductSchemaValidationZod } from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  const product = req.body;
  const validationResult = ProductSchemaValidationZod.safeParse(product);
  const existingProduct = await productServices.getSingleProductByNameFromDB(
    product.name
  );
  //check product existing
  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: "Product name must be unique",
    });
  }
  //if validation failed send error mesage
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      errors: validationResult.error.errors.map((err) => err.message),
    });
  }
  //create new product if there is no error
  try {
    const result = await productServices.createProductToDB(
      validationResult.data
    );
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await productServices.getProductsFromDB(
      searchTerm as string
    );
    if (result.length > 0) {
      const message = searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : "Products fetched successfully!";
      res.status(200).json({
        success: true,
        message: message,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const PartialProductSchemaValidationZod =
      ProductSchemaValidationZod.partial();

    // check whether update product name already exits or not
    if (updateData?.name) {
      updateData.name = updateData.name.trim();
    }
    const existingProduct = await productServices.getSingleProductByNameFromDB(
      updateData?.name
    );
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product name must be unique",
      });
    }

    //validate update data
    const validationResult =
      PartialProductSchemaValidationZod.safeParse(updateData);

    //if validation failed send error message
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.errors.map((err) => err.message),
      });
    }

    //update product data if no error exits
    const result = await productServices.updateProductInDB(
      productId,
      validationResult.data
    );
    if (result) {
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDB(productId);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};

export const productControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
