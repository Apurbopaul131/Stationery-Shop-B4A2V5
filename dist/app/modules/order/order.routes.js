"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewires/auth"));
const validateRequest_1 = __importDefault(require("../../middlewires/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
//create router object
const router = express_1.default.Router();
//create post route to handle all post request to client
router.post('/orders', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(order_validation_1.OrderValidations.createOrderValidationSchema), order_controller_1.OrderControllers.createOrder);
//view all orders
router.get('/orders', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.OrderControllers.viewOrders);
//get me orders
router.get('/me-orders', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.OrderControllers.getMeOrders);
//accept order(status pending to shipping)
router.patch('/orders/accept-order/:orderId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.OrderControllers.acceptOrder);
router.delete('/orders/cancle-order/:orderId', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.admin), order_controller_1.OrderControllers.cancleOrder);
router.get('/orders/verify', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.OrderControllers.verifyPayment);
//create get route to handle all post request to client
router.get('/orders/revenue', (0, auth_1.default)(user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE === null || user_constant_1.USER_ROLE === void 0 ? void 0 : user_constant_1.USER_ROLE.user), order_controller_1.OrderControllers.callculateRevenue);
//export router
exports.orderRouter = router;
