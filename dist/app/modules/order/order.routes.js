"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const oreder_controller_1 = require("./oreder.controller");
//create router object
const router = express_1.default.Router();
//create post route to handle all post request to client
router.post("/orders", oreder_controller_1.ordersControllers.createOrder);
//create get route to handle all post request to client
router.get("/orders/revenue", oreder_controller_1.ordersControllers.callculateRevenue);
//export router
exports.orderRoute = router;
