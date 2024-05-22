import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderToDB = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};

const getOrdersFromDB = async (email?: string) => {
  let products;
  if (email) {
    products = await OrderModel.find({ email });
  } else {
    products = await OrderModel.find();
  }
  return products;
};

export const OrderServices = {
  createOrderToDB,
  getOrdersFromDB,
};
