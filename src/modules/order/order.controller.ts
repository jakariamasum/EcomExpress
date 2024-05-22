import { Request, Response } from "express";
import { productServices } from "../product/product.service";
import { OrderServices } from "./order.service";
// import { ProductModel } from "../product/product.model";

const createOrder = async (req: Request, res: Response) => {
  const {productId,quantity } = req.body;
  try {
    const product = await productServices.getSingleProductFromDB(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }
    await productServices.updateProductInventory(productId,quantity);
    const result= await OrderServices.createOrderToDB(req.body);

    res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const OrderControllers={
    createOrder,
}