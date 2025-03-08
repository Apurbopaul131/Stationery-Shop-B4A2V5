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
exports.ProductServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
//get products using search term
// const getProductsToDb = async (searchTerm: string) => {
//   const query = searchTerm
//     ? {
//         $or: [
//           { category: searchTerm },
//           { brand: searchTerm },
//           { name: searchTerm },
//         ],
//       }
//     : {};
//   const result = await StationeryProductModel.find(query);
//   return result;
// };
const getAllproductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.StationeryProductModel.find({ isDeleted: false }), query)
        .search(product_constant_1.searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery;
    return {
        meta,
        result,
    };
});
// get specific product by id from db
const getSingleProductToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield product_model_1.StationeryProductModel.findOne({
        _id: id,
        isDeleted: true,
    });
    if (isDeleted) {
        throw new AppError_1.default(404, 'Product not found!');
    }
    const result = yield product_model_1.StationeryProductModel.findById(id).select('name brand price category description quantity inStock image');
    if (!result) {
        throw new AppError_1.default(404, 'Product not found!');
    }
    return result;
});
exports.ProductServices = {
    getSingleProductToDb,
    getAllproductFromDB,
};
