"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
//create router object
const router = express_1.default.Router();
//create get api to handle get request from client
router.get('/products', product_controller_1.ProductControllers.getAllProduct);
//create get api to handle get request from client
router.get('/products/:productId', product_controller_1.ProductControllers.getSingleProduct);
//export
exports.productRouter = router;
