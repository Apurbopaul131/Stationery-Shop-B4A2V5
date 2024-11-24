import { Request, Response } from "express";
import { TStationeryProduct } from "../product/product.interface";
import { ProductServices } from "../product/product.service";
import { orderServices } from "./order.service";

//Create order
const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const orderProductId = req.body.product;
    //find to product model
    const existProduct =
      await orderServices.findOrderdProductToProductCollection(orderProductId);
    //check ordered product exist or not
    if (existProduct) {
      //check ordered product quantity less than or equal to product quantity
      if (existProduct.quantity >= req.body.quantity) {
        //create oreder document to order collection
        const createdOrder = await orderServices.createOrder(req.body);

        const remainingProductQuantity =
          existProduct.quantity - req.body.quantity;
        //create new object to update into
        const updatedProduct: TStationeryProduct = {
          name: existProduct.name,
          brand: existProduct.brand,
          price: existProduct.price,
          category: existProduct.category,
          description: existProduct.description,
          quantity: remainingProductQuantity,
          inStock: remainingProductQuantity > 0 ? true : false,
        };
        //update into product colleciton
        await ProductServices.updateSingleProductToDb(
          existProduct.id,
          updatedProduct
        );

        //send successful reponse
        return res.status(200).json({
          message: "Order Created successfully",
          success: true,
          data: createdOrder,
        });
      } else {
        return res.status(401).json({
          message: "Insufficient product",
          success: false,
          data: {},
        });
      }
    } else {
      //send product does not exist response
      return res.status(401).json({
        message: "Ordered product does not exist",
        success: false,
        data: {},
      });
    }
  } catch (err: any) {
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
};

//callculate total revenue
const callculateRevenue = async (req: Request, res: Response): Promise<any> => {
  const result = await orderServices.callculateTotalRevenueToDB();
  return res.status(200).json({
    message: "Revenue calculated successfully",
    success: true,
    data: result,
  });
};
export const ordersControllers = {
  createOrder,
  callculateRevenue,
};
