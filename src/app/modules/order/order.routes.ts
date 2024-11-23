import express from "express";
import { ordersControllers } from "./oreder.controller";

const router = express.Router();

//create post route to handle all post request to client
router.post("/orders", ordersControllers.createOrder);

//create get route to handle all post request to client
router.get("/orders/revenue", ordersControllers.callculateRevenue);

//export router
export const orderRoute = router;
