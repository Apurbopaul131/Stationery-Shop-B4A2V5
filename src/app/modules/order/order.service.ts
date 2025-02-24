import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import { TStationeryProduct } from '../product/product.interface';
import { StationeryProductModel } from '../product/product.model';
import { TOrder } from './order.interface';

import OrderModel from './order.model';

//Find oredered product form product collection
// const findOrderdProductToProductCollection = async (productId: string) => {
//   const result = await StationeryProductModel.findById(productId);
//   return result;
// };

//Create an order to orders collecion
const createOrderIntoDB = async (userData: JwtPayload, orderData: TOrder) => {
  const existProduct = await StationeryProductModel.findProductById(
    orderData.product.toString(),
  );
  //product exist or not
  if (!existProduct) {
    throw new AppError(404, 'Product does not exist');
  }
  //Order excced the limit quantity or not
  if (orderData.quantity > existProduct.quantity) {
    throw new AppError(404, 'Do not have sufficient product!!');
  }
  //create order into db
  const finalOrderdProductData = {
    ...orderData,
    email: userData?.email,
    totalPrice: existProduct?.price * orderData.quantity,
  };
  const orderedProduct = await OrderModel.create(finalOrderdProductData);
  const remainingProductQuantity = existProduct.quantity - orderData.quantity;
  const updatedProduct: Pick<TStationeryProduct, 'quantity' | 'inStock'> = {
    quantity: remainingProductQuantity,
    inStock: remainingProductQuantity > 0 ? true : false,
  };
  //update product data
  await StationeryProductModel.findByIdAndUpdate(
    orderData?.product,
    updatedProduct,
  );
  const orderdProductNew = await OrderModel.findById(orderedProduct?._id)
    .select('email product quantity totalPrice')
    .populate({
      path: 'product',
      select: 'name barnd price category image description quantity inStock',
    });
  return orderdProductNew;
};

const viewAllOrderFromDB = async () => {
  const result = await OrderModel.find({})
    .select('email product quantity totalPrice status')
    .populate({
      path: 'product',
      select: 'name barnd price category image description quantity inStock',
    });
  return result;
};

const getMeOrdersFromDB = async (userEmail: string) => {
  const result = await OrderModel.find({ email: userEmail })
    .select('email product quantity totalPrice status')
    .populate({
      path: 'product',
      select: 'name barnd price category image description quantity inStock',
    });
  return result;
};

const acceptOrderIntoDB = async (orderId: string) => {
  const isOrderExist = await OrderModel.findById(orderId);
  if (!isOrderExist) {
    throw new AppError(404, 'Order does not exist.');
  }
  const updatedStatus = await OrderModel.findByIdAndUpdate(
    orderId,
    { status: 'Shipping' },
    { new: true },
  )
    .select('email product quantity totalPrice status')
    .populate({
      path: 'product',
      select: 'name barnd price category image description quantity inStock',
    });
  return updatedStatus;
};

const cancleOrderIntoDB = async (orderId: string) => {
  const isOrderExist = await OrderModel.findById(orderId);
  if (!isOrderExist) {
    throw new AppError(404, 'Order does not exist.');
  }
  const deletedOrder = await OrderModel.findByIdAndDelete(orderId)
    .select('email product quantity totalPrice status')
    .populate({
      path: 'product',
      select: 'name barnd price category image description quantity inStock',
    });
  return deletedOrder;
};
//Callculate total revenue from all database orders
// const callculateTotalRevenueToDB = async () => {
//   const result = await OrderModel.aggregate([
//     //stage-1
//     {
//       $group: {
//         _id: null,
//         totalRevenue: { $sum: '$totalPrice' },
//       },
//     },
//     //stage-2
//     {
//       $project: { _id: 0, totalRevenue: 1 },
//     },
//   ]);
//   return result;
// };
export const OrderServices = {
  createOrderIntoDB,
  viewAllOrderFromDB,
  getMeOrdersFromDB,
  acceptOrderIntoDB,
  cancleOrderIntoDB,
};
