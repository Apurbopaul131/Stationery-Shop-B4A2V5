"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const catchAsync_1 = __importDefault(require("../../uitls/catchAsync"));
const sendResponse_1 = __importDefault(require("../../uitls/sendResponse"));
const product_service_1 = require("./product.service");
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
const getAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, result } = yield product_service_1.ProductServices.getAllproductFromDB(req.query);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Products retrieved successfully',
        meta: meta,
        data: result,
    });
}));
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idOfProduct = req.params.productId;
    const result = yield product_service_1.ProductServices.getSingleProductToDb(idOfProduct);
    //send response to client
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Product retrieved successfully',
        data: result,
    });
}));
//Export all functions
exports.ProductControllers = {
    getSingleProduct,
    getAllProduct,
};
