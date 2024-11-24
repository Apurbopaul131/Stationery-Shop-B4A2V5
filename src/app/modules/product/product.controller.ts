import { Request, Response } from "express";
import { ProductServices } from "./product.service";
const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.createProductToDB(req.body);

    //send response to client
    res.status(200).json({
      message: "Product created successfully",
      success: true,
      data: result,
    });
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

//get procuts by searchterm
const getProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const searchTerm = req.query.searchTerm;
    const result = await ProductServices.getProductsToDb(searchTerm as string);

    //Execute the data does not exist in database
    if (result === undefined || result.length == 0) {
      return res.status(404).json({
        message: "Product not found!",
        success: false,
      });
    }
    //send response to client
    return res.status(200).json({
      message: "Products retrieved successfully",
      success: true,
      data: result,
    });
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

//get single product
const getSingleProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const idOfProduct = req.params.productId;

    const result = await ProductServices.getSingleProductToDb(idOfProduct);
    //Execute the data does not exist in database
    if (!result) {
      return res.status(404).json({
        message: "Product not found!",
        success: false,
        data: {},
      });
    }

    //send response to client
    return res.status(200).json({
      message: "Product retrieved successfully",
      success: true,
      data: result,
    });
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

//update specific product by id
const updateSingleProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const idOfProduct = req.params.productId;
    const updatedProductData = req.body;

    const result = await ProductServices.updateSingleProductToDb(
      idOfProduct,
      updatedProductData
    );
    //Execute the data does not exist in database
    if (!result) {
      return res.status(404).json({
        message: "Product not found!",
        success: false,
        data: {},
      });
    }

    //send response to client
    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: result,
    });
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

//delete specific product by id
const deleteSingleProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const idOfProduct = req.params.productId;

    const result = await ProductServices.deleteSingleProductToDb(idOfProduct);
    //Execute the data does not exist in database
    if (!result) {
      return res.status(404).json({
        message: "Product not found!",
        success: false,
      });
    }

    //send response to client
    return res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      data: {},
    });
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

//Export all functions
export const ProductControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
