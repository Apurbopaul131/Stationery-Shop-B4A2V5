"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const product_model_1 = require("../product/product.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = __importDefault(require("./order.model"));
const order_uitls_1 = require("./order.uitls");
//Find oredered product form product collection
// const findOrderdProductToProductCollection = async (productId: string) => {
//   const result = await StationeryProductModel.findById(productId);
//   return result;
// };
//Create an order to orders collecion
const createOrderIntoDB = (userData, orderData, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userData === null || userData === void 0 ? void 0 : userData.email });
    const isDeleted = yield product_model_1.StationeryProductModel.findOne({
        _id: orderData === null || orderData === void 0 ? void 0 : orderData.product,
        isDeleted: true,
    });
    if (isDeleted) {
        throw new AppError_1.default(404, 'Product not found!');
    }
    const existProduct = yield product_model_1.StationeryProductModel.findProductById(orderData.product.toString());
    //product exist or not
    if (!existProduct) {
        throw new AppError_1.default(404, 'Product not found!');
    }
    //Order excced the limit quantity or not
    if (orderData.quantity > existProduct.quantity) {
        throw new AppError_1.default(404, 'Do not have sufficient product!!');
    }
    const totalPrice = ((existProduct === null || existProduct === void 0 ? void 0 : existProduct.price) * orderData.quantity).toFixed(2);
    //create order into db
    const finalOrderdProductData = Object.assign(Object.assign({}, orderData), { email: userData === null || userData === void 0 ? void 0 : userData.email, totalPrice });
    const orderedProduct = yield order_model_1.default.create(finalOrderdProductData);
    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: user === null || user === void 0 ? void 0 : user._id,
        currency: 'BDT',
        customer_name: user === null || user === void 0 ? void 0 : user.name,
        customer_address: 'N/A',
        customer_email: user === null || user === void 0 ? void 0 : user.email,
        customer_phone: 'N/A',
        customer_city: 'N/A',
        client_ip,
    };
    const payment = yield order_uitls_1.orderUitls.makePaymentAsync(shurjopayPayload);
    if (payment.transactionStatus) {
        yield order_model_1.default.findByIdAndUpdate(orderedProduct._id, {
            transaction: {
                id: payment === null || payment === void 0 ? void 0 : payment.sp_order_id,
                transactionStatus: payment === null || payment === void 0 ? void 0 : payment.transactionStatus,
            },
        });
    }
    return payment === null || payment === void 0 ? void 0 : payment.checkout_url;
});
const viewAllOrderFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({
        'transaction.payment_status': 'Success',
    })
        .select('email product quantity totalPrice status transaction')
        .populate({
        path: 'product',
        select: 'name barnd price category image description quantity inStock',
    });
    return result;
});
const getMeOrdersFromDB = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({ email: userEmail })
        .select('email product quantity totalPrice status transaction')
        .populate({
        path: 'product',
        select: 'name barnd price category image description quantity inStock',
    });
    return result;
});
const acceptOrderIntoDB = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const isOrderExist = yield order_model_1.default.findById(orderId);
    if (!isOrderExist) {
        throw new AppError_1.default(404, 'Order does not exist.');
    }
    const updatedStatus = yield order_model_1.default.findByIdAndUpdate(orderId, { status: 'Shipping' }, { new: true })
        .select('email product quantity totalPrice status')
        .populate({
        path: 'product',
        select: 'name barnd price category image description quantity inStock',
    });
    return updatedStatus;
});
const cancleOrderIntoDB = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const isOrderExist = yield order_model_1.default.findById(orderId);
    if (!isOrderExist) {
        throw new AppError_1.default(404, 'Order does not exist.');
    }
    const deletedOrder = yield order_model_1.default.findByIdAndDelete(orderId)
        .select('email product quantity totalPrice status')
        .populate({
        path: 'product',
        select: 'name barnd price category image description quantity inStock',
    });
    return deletedOrder;
});
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
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_uitls_1.orderUitls.verifiedPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            'transaction.payment_status': verifiedPayment[0].bank_status,
        });
    }
    //payment success then reduce quantity and update the stock status
    if (verifiedPayment[0].bank_status === 'Success') {
        const orderedData = yield order_model_1.default.findOne({
            'transaction.id': order_id,
        });
        const existingProduct = yield product_model_1.StationeryProductModel.findById(orderedData === null || orderedData === void 0 ? void 0 : orderedData.product);
        if (orderedData && existingProduct) {
            const remainingProductQuantity = (existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.quantity) - (orderedData === null || orderedData === void 0 ? void 0 : orderedData.quantity);
            const updatedProduct = {
                quantity: remainingProductQuantity,
                inStock: remainingProductQuantity > 0 ? true : false,
            };
            //update product data
            yield product_model_1.StationeryProductModel.findByIdAndUpdate(existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct._id, updatedProduct);
        }
    }
    return verifiedPayment;
});
exports.OrderServices = {
    createOrderIntoDB,
    viewAllOrderFromDB,
    getMeOrdersFromDB,
    acceptOrderIntoDB,
    cancleOrderIntoDB,
    verifyPayment,
};
