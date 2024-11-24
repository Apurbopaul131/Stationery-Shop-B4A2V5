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
exports.orderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = __importDefault(require("./order.model"));
//Find oredered product form product collection
const findOrderdProductToProductCollection = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.StationeryProductModel.findById(productId);
    return result;
});
//Create an order to orders collecion
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.create(orderData);
    return result;
});
//Callculate total revenue from all database orders
const callculateTotalRevenueToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.aggregate([
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
});
exports.orderServices = {
    findOrderdProductToProductCollection,
    createOrder,
    callculateTotalRevenueToDB,
};
