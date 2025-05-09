import express from 'express';

import { ProductControllers } from './product.controller';
//create router object
const router = express.Router();

//create get api to handle get request from client
router.get('/products', ProductControllers.getAllProduct);

//create get api to handle get request from client
router.get('/products/:productId', ProductControllers.getSingleProduct);

//export
export const productRouter = router;
