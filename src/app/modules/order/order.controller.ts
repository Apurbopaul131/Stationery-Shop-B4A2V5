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
// //Create order
// const createOrder = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const orderProductId = req.body.product;
//     //find to product model
//     const existProduct =
//       await orderServices.findOrderdProductToProductCollection(orderProductId);
//     //check ordered product exist or not
//     if (existProduct) {
//       //check ordered product quantity less than or equal to product quantity
//       if (existProduct.quantity >= req.body.quantity) {
//         //create oreder document to order collection
//         const createdOrder = await orderServices.createOrder(req.body);

//         const remainingProductQuantity =
//           existProduct.quantity - req.body.quantity;
//         //create new object to update into
//         const updatedProduct: TStationeryProduct = {
//           name: existProduct.name,
//           brand: existProduct.brand,
//           price: existProduct.price,
//           image: existProduct.image,
//           category: existProduct.category,
//           description: existProduct.description,
//           quantity: remainingProductQuantity,
//           inStock: remainingProductQuantity > 0 ? true : false,
//         };
//         //update into product colleciton
//         await AdminServices.updateSingleProductToDb(
//           existProduct.id,
//           updatedProduct,
//         );

//         //send successful reponse
//         return res.status(200).json({
//           message: 'Order Created successfully',
//           success: true,
//           data: createdOrder,
//         });
//       } else {
//         return res.status(401).json({
//           message: 'Insufficient product',
//           success: false,
//           data: {},
//         });
//       }
//     } else {
//       //send product does not exist response
//       return res.status(401).json({
//         message: 'Ordered product does not exist',
//         success: false,
//         data: {},
//       });
//     }
//   } catch (err: any) {
//     res.status(400).json({
//       message: 'Validation failed',
//       success: false,
//       error: {
//         name: err.name,
//         errors: err.errors,
//       },
//       stack: err.stack,
//     });
//   }
// };

//callculate total revenue
// const callculateRevenue = async (req: Request, res: Response): Promise<any> => {
//   const result = await orderServices.callculateTotalRevenueToDB();
//   return res.status(200).json({
//     message: 'Revenue calculated successfully',
//     success: true,
//     data: result,
//   });
// };
const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order verified successfully',
    data: order,
  });
});
export const OrderControllers = {
  createOrder,
  viewOrders,
  getMeOrders,
  acceptOrder,
  cancleOrder,
  verifyPayment,
};
