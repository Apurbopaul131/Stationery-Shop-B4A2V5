import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { ProductServices } from './product.service';

// //get procuts by searchterm
// const getProducts = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const searchTerm = req.query.searchTerm;
//     const result = await ProductServices.getProductsToDb(searchTerm as string);

//     //Execute the data does not exist in database
//     if (result === undefined || result.length == 0) {
//       return res.status(404).json({
//         message: 'Product not found!',
//         success: false,
//       });
//     }
//     //send response to client
//     return res.status(200).json({
//       message: 'Products retrieved successfully',
//       success: true,
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(400).json({
//       message: 'Validation failed',
//       success: false,
//       error: {
//         name: err.name,
//         errors: err.errors,
//       },
//       stack: err.stack,
//     });
//   }
// };

//get single product
const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await ProductServices.getAllproductFromDB(req.query);

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Products retrieved successfully',
    meta: meta,
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const idOfProduct = req.params.productId;

  const result = await ProductServices.getSingleProductToDb(idOfProduct);

  //send response to client
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product retrieved successfully',
    data: result,
  });
});

//Export all functions
export const ProductControllers = {
  getSingleProduct,
  getAllProduct,
};
