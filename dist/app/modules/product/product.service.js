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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
//Create product to database
const createProductToDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.StationeryProductModel.create(productData);
    return result;
});
//get products using search term
const getProductsToDb = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const query = searchTerm
        ? {
            $or: [
                { category: searchTerm },
                { brand: searchTerm },
                { name: searchTerm },
            ],
        }
        : {};
    const result = yield product_model_1.StationeryProductModel.find(query);
    return result;
});
// get specific product by id from db
const getSingleProductToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.StationeryProductModel.findById(id);
    return result;
});
//update product into database
const updateSingleProductToDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.StationeryProductModel.findByIdAndUpdate(id, data, {
        new: true,
    });
    return result;
});
//delete specific product by id form db
const deleteSingleProductToDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.StationeryProductModel.findByIdAndDelete(id);
    return result;
});
exports.ProductServices = {
    createProductToDB,
    getProductsToDb,
    getSingleProductToDb,
    deleteSingleProductToDb,
    updateSingleProductToDb,
};
