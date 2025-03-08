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
exports.StationeryProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_constant_1 = require("./product.constant");
//Stationary product schema
const StationeryProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true, // Removes extra spaces
    },
    brand: {
        type: String,
        required: [true, 'brand is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: [0, 'Price must be a positive number'],
    },
    category: {
        type: String,
        required: [true, 'category is required'],
        enum: {
            values: product_constant_1.productCategories,
            message: '{VALUE} is not supported.',
        },
    },
    image: {
        type: String,
        default: '',
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'description is required'],
        min: [0, 'Quantity must be a positive number'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'inStock is required'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});
//Custom statics method that is used for check product is exist or not
StationeryProductSchema.statics.findProductById = function (productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield exports.StationeryProductModel.findById(productId);
        return existingProduct;
    });
};
//create model and export
exports.StationeryProductModel = mongoose_1.default.model('Product', StationeryProductSchema);
