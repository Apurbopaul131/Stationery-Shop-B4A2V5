import mongoose from "mongoose";
import { TStationeryProduct } from "./product.interface";

//Stationary product schema
const StationeryProductSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret.id; // Remove the `id` field
      },
    },
  }
);
//create model and export
export const StationeryProductModel = mongoose.model<TStationeryProduct>(
  "Product",
  StationeryProductSchema
);
