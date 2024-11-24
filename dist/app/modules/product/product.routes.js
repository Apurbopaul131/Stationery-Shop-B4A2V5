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
//create post api to handle post requsest from client
router.post("/products", product_controller_1.ProductControllers.createProduct);
//create get api to handle get request from client
router.get("/products", product_controller_1.ProductControllers.getProducts);
//create get api to handle get request from client
router.get("/products/:productId", product_controller_1.ProductControllers.getSingleProduct);
//create delete api to handle delete request from client
router.delete("/products/:productId", product_controller_1.ProductControllers.deleteSingleProduct);
router.put("/products/:productId", product_controller_1.ProductControllers.updateSingleProduct);
//export
exports.productRouter = router;
