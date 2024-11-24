"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationeryProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//Stationary product schema
const StationeryProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true, // Removes extra spaces
    },
    brand: {
        type: String,
        required: [true, "brand is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        min: [0, "Price must be a positive number"],
    },
    category: {
        type: String,
        required: [true, "category is required"],
        enum: {
            values: [
                "Writing",
                "Office Supplies",
                "Art Supplies",
                "Educational",
                "Technology",
            ],
            message: "{VALUE} is not supported.",
        },
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, "description is required"],
        min: [0, "Quantity must be a positive number"],
    },
    inStock: {
        type: Boolean,
        required: [true, "inStock is required"],
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            delete ret.id; // Remove the `id` field
        },
    },
});
//create model and export
exports.StationeryProductModel = mongoose_1.default.model("Product", StationeryProductSchema);
