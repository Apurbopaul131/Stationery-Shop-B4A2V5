import { StationeryProductModel } from "../product/product.model";
import { Order } from "./order.interface";
import OrderModel from "./order.model";

//Find oredered product form product collection
const findOrderdProductToProductCollection = async (productId: string) => {
  const result = await StationeryProductModel.findById(productId);
  return result;
};

//Create an order to orders collecion
const createOrder = async (orderData: Order) => {
  const result = await OrderModel.create(orderData);
  return result;
};

//Callculate total revenue from all database orders
const callculateTotalRevenueToDB = async () => {
  const result = await OrderModel.aggregate([
    //stage-1
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
    //stage-2
    {
      $project: { _id: 0, totalRevenue: 1 },
    },
  ]);
  return result;
};
export const orderServices = {
  findOrderdProductToProductCollection,
  createOrder,
  callculateTotalRevenueToDB,
};
