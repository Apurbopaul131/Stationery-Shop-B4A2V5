import mongoose, { Schema } from "mongoose";
import { Order } from "./order.interface";

//order schema
const OrderSchema: Schema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret.id; // Remove the `id` field
      },
    },
  }
);

// Create and export the model
const OrderModel = mongoose.model<Order>("Order", OrderSchema);

//export
export default OrderModel;
