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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersControllers = void 0;
const product_service_1 = require("../product/product.service");
const order_service_1 = require("./order.service");
//Create order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderProductId = req.body.product;
        //find to product model
        const existProduct = yield order_service_1.orderServices.findOrderdProductToProductCollection(orderProductId);
        //check ordered product exist or not
        if (existProduct) {
            //check ordered product quantity less than or equal to product quantity
            if (existProduct.quantity >= req.body.quantity) {
                //create oreder document to order collection
                const createdOrder = yield order_service_1.orderServices.createOrder(req.body);
                const remainingProductQuantity = existProduct.quantity - req.body.quantity;
                //create new object to update into
                const updatedProduct = {
                    name: existProduct.name,
                    brand: existProduct.brand,
                    price: existProduct.price,
                    category: existProduct.category,
                    description: existProduct.description,
                    quantity: remainingProductQuantity,
                    inStock: remainingProductQuantity > 0 ? true : false,
                };
                //update into product colleciton
                yield product_service_1.ProductServices.updateSingleProductToDb(existProduct.id, updatedProduct);
                //send successful reponse
                return res.status(200).json({
                    message: "Order Created successfully",
                    success: true,
                    data: createdOrder,
                });
            }
            else {
                return res.status(401).json({
                    message: "Insufficient product",
                    success: false,
                    data: {},
                });
            }
        }
        else {
            //send product does not exist response
            return res.status(401).json({
                message: "Ordered product does not exist",
                success: false,
                data: {},
            });
        }
    }
    catch (err) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: err.name,
                errors: err.errors,
            },
            stack: err.stack,
        });
    }
});
//callculate total revenue
const callculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderServices.callculateTotalRevenueToDB();
    return res.status(200).json({
        message: "Revenue calculated successfully",
        success: true,
        data: result,
    });
});
exports.ordersControllers = {
    createOrder,
    callculateRevenue,
};
