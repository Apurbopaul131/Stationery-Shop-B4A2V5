import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import { StationeryProductModel } from '../product/product.model';
import { TOrder } from './order.interface';

import { TStationeryProduct } from '../product/product.interface';
import { User } from '../user/user.model';
import OrderModel from './order.model';
import { orderUitls } from './order.uitls';

//Find oredered product form product collection
// const findOrderdProductToProductCollection = async (productId: string) => {
//   const result = await StationeryProductModel.findById(productId);
//   return result;
// };

//Create an order to orders collecion
const createOrderIntoDB = async (
  userData: JwtPayload,
  orderData: TOrder,
  client_ip: string,
) => {
  const user = await User.findOne({ email: userData?.email });

  const isDeleted = await StationeryProductModel.findOne({
    _id: orderData?.product,
    isDeleted: true,
  });
  if (isDeleted) {
    throw new AppError(404, 'Product not found!');
  }
  const existProduct = await StationeryProductModel.findProductById(
    orderData.product.toString(),
  );
  //product exist or not
  if (!existProduct) {
    throw new AppError(404, 'Product not found!');
  }
  //Order excced the limit quantity or not
  if (orderData.quantity > existProduct.quantity) {
    throw new AppError(404, 'Do not have sufficient product!!');
  }
  const totalPrice = (existProduct?.price * orderData.quantity).toFixed(2);
  //create order into db
  const finalOrderdProductData = {
    ...orderData,
    email: userData?.email,
    totalPrice,
  };
  const orderedProduct = await OrderModel.create(finalOrderdProductData);

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: user?._id,
    currency: 'BDT',
    customer_name: user?.name,
    customer_address: 'N/A',
    customer_email: user?.email,
    customer_phone: 'N/A',
    customer_city: 'N/A',
    client_ip,
  };

  const payment = await orderUitls.makePaymentAsync(shurjopayPayload);
  if (payment.transactionStatus) {
    await OrderModel.findByIdAndUpdate(orderedProduct._id, {
      transaction: {
        id: payment?.sp_order_id,
        transactionStatus: payment?.transactionStatus,
      },
    });
  }
  return payment?.checkout_url;
};

const viewAllOrderFromDB = async () => {
  const result = await OrderModel.find({
    'transaction.payment_status': 'Success',
  })
    .select('email product quantity totalPrice status transaction')
    .populate({
      path: 'product',
      select: 'name barnd price category image description quantity inStock',
    });
  return result;
};

const getMeOrdersFromDB = async (userEmail: string) => {
  const result = await OrderModel.find({ email: userEmail })
    .select('email product quantity totalPrice status transaction')
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
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUitls.verifiedPaymentAsync(order_id);
  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        'transaction.payment_status': verifiedPayment[0].bank_status,
      },
    );
  }
  //payment success then reduce quantity and update the stock status
  if (verifiedPayment[0].bank_status === 'Success') {
    const orderedData = await OrderModel.findOne({
      'transaction.id': order_id,
    });
    const existingProduct = await StationeryProductModel.findById(
      orderedData?.product,
    );
    if (orderedData && existingProduct) {
      const remainingProductQuantity =
        existingProduct?.quantity - orderedData?.quantity;
      const updatedProduct: Pick<TStationeryProduct, 'quantity' | 'inStock'> = {
        quantity: remainingProductQuantity,
        inStock: remainingProductQuantity > 0 ? true : false,
      };
      //update product data
      await StationeryProductModel.findByIdAndUpdate(
        existingProduct?._id,
        updatedProduct,
      );
    }
  }
  return verifiedPayment;
};
export const OrderServices = {
  createOrderIntoDB,
  viewAllOrderFromDB,
  getMeOrdersFromDB,
  acceptOrderIntoDB,
  cancleOrderIntoDB,
  verifyPayment,
};
