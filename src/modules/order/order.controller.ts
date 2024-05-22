import { Request, Response } from "express";
import { productServices } from "../product/product.service";
import { OrderServices } from "./order.service";
import { OrderSchemaValidationZod } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  const validationResult = OrderSchemaValidationZod.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      errors: validationResult.error,
    });
  }

  const { productId, quantity } = validationResult.data;
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
    await productServices.updateProductInventory(productId, quantity);
    const result = await OrderServices.createOrderToDB(validationResult.data);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrderServices.getOrdersFromDB(email as string);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
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

export const OrderControllers = {
  createOrder,
  getOrders,
};
