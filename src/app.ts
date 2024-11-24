import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { orderRoute } from './app/modules/order/order.routes';
import { productRouter } from './app/modules/product/product.routes';

const app: Application = express();

//parsers
app.use(express.json());
//cors
app.use(cors());

//application routes
app.use('/api', productRouter);
app.use('/api', orderRoute);

//check application running or not
app.get('/', (req: Request, res: Response) => {
  res.json({
    messsage: 'server running!',
    success: true,
    data: {},
  });
});
//export
export default app;
