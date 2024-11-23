import cors from "cors";
import express, { Application, Request, Response } from "express";
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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world bangladhesh");
});
export default app;
