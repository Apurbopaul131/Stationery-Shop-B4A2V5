import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { OrderServices } from './order.service';
// import { AdminServices } from '../admin/admin.service';
// import { TStationeryProduct } from '../product/product.interface';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrderIntoDB(
    req.user,
    req.body,
    req.ip!,
  );
  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order created successfully.',
    data: result,
  });
});

//view all order
const viewOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.viewAllOrderFromDB();
  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Orders retrived successfully.',
    data: result,
  });
});

//view user specific orders
const getMeOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getMeOrdersFromDB(req?.user?.email);
  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User orders retrived successfully.',
    data: result,
  });
});

const acceptOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const result = await OrderServices.acceptOrderIntoDB(orderId);
  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order accepted successfully.',
    data: result,
  });
});

const cancleOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const result = await OrderServices.cancleOrderIntoDB(orderId);
  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order deleted successfully.',
    data: result,
  });
});

//callculate total revenue
// const callculateRevenue = async (req: Request, res: Response): Promise<any> => {
//   const result = await orderServices.callculateTotalRevenueToDB();
//   return res.status(200).json({
//     message: 'Revenue calculated successfully',
//     success: true,
//     data: result,
//   });
// };

//Verify the payment successful or not
const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order verified successfully',
    data: order,
  });
});

//export
export const OrderControllers = {
  createOrder,
  viewOrders,
  getMeOrders,
  acceptOrder,
  cancleOrder,
  verifyPayment,
};
