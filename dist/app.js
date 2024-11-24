"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const order_routes_1 = require("./app/modules/order/order.routes");
const product_routes_1 = require("./app/modules/product/product.routes");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
//cors
app.use((0, cors_1.default)());
//application routes
app.use('/api', product_routes_1.productRouter);
app.use('/api', order_routes_1.orderRoute);
//check application running or not
app.get('/', (req, res) => {
    res.json({
        messsage: 'server running!',
        success: true,
        data: {},
    });
});
//export
exports.default = app;
