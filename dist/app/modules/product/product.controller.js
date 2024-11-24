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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.createProductToDB(req.body);
        //send response to client
        res.status(200).json({
            message: "Product created successfully",
            success: true,
            data: result,
        });
    }
    catch (err) {
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
});
//get procuts by searchterm
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getProductsToDb(searchTerm);
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
    }
    catch (err) {
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
});
//get single product
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idOfProduct = req.params.productId;
        const result = yield product_service_1.ProductServices.getSingleProductToDb(idOfProduct);
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
    }
    catch (err) {
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
});
//update specific product by id
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idOfProduct = req.params.productId;
        const updatedProductData = req.body;
        const result = yield product_service_1.ProductServices.updateSingleProductToDb(idOfProduct, updatedProductData);
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
    }
    catch (err) {
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
});
//delete specific product by id
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idOfProduct = req.params.productId;
        const result = yield product_service_1.ProductServices.deleteSingleProductToDb(idOfProduct);
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
    }
    catch (err) {
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
});
//Export all functions
exports.ProductControllers = {
    createProduct,
    getProducts,
    getSingleProduct,
    deleteSingleProduct,
    updateSingleProduct,
};
