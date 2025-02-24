import express from 'express';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { OrderControllers } from './order.controller';
import { OrderValidations } from './order.validation';

//create router object
const router = express.Router();

//create post route to handle all post request to client
router.post(
  '/orders',
  auth(USER_ROLE.user),
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderControllers.createOrder,
);
//view all orders
router.get('/orders', auth(USER_ROLE.admin), OrderControllers.viewOrders);
//get me orders
router.get('/me-orders', auth(USER_ROLE.user), OrderControllers.getMeOrders);

//accept order(status pending to shipping)
router.patch(
  '/orders/accept-order/:orderId',
  auth(USER_ROLE.admin),
  OrderControllers.acceptOrder,
);
router.delete(
  '/orders/cancle-order/:orderId',
  auth(USER_ROLE?.admin),
  OrderControllers.cancleOrder,
);
//create get route to handle all post request to client
// router.get('/orders/revenue', OrderControllers.callculateRevenue);

//export router
export const orderRouter = router;
