"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//order schema
const OrderSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please provide a valid email address",
        ],
    },
    product: {
        type: String,
        required: true, // Stores product ID or name as a string
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
        type: Number,
        required: true,
        min: [0, "Total price must be a positive number"],
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            delete ret.id; // Remove the `id` field
        },
    },
});
// Create and export the model
const OrderModel = mongoose_1.default.model("Order", OrderSchema);
//export
exports.default = OrderModel;
