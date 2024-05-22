import { Request, Response } from "express";
import { productServices } from "../product/product.service";
import { OrderServices } from "./order.service";
import { OrderSchemaValidationZod } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  const validationResult = OrderSchemaValidationZod.safeParse(req.body);

  // response back if validation failed
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      errors: validationResult.error,
    });
  }

  const { productId, quantity } = validationResult.data;
  try {
    // check whether ordered product exits or not
    const product = await productServices.getSingleProductFromDB(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // check inventory.quantity is available or not
    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    // update inventory.quntity and isStock if order created
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

    if (result.length > 0) {
      const message = email
        ? "Orders fetched successfully for user email!"
        : "Orders fetched successfully!";

      return res.status(200).json({
        success: true,
        message: message,
        data: result,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  } catch (error) {
    return res.status(500).json({
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
