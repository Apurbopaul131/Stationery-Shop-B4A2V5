import cors from "cors";
import express, { Application } from "express";
import { orderRoute } from "./app/modules/order/order.routes";
import { productRouter } from "./app/modules/product/product.routes";

const app: Application = express();

//parsers
app.use(express.json());
//cors
app.use(cors());

//application routes
app.use("/api", productRouter);
app.use("/api", orderRoute);

//export
export default app;
