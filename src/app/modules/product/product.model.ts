import mongoose from 'mongoose';
import { productCategories } from './product.constant';
import { ProductModel, TStationeryProduct } from './product.interface';

//Stationary product schema
const StationeryProductSchema = new mongoose.Schema<
  TStationeryProduct,
  ProductModel
>(
  {
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
        values: productCategories,
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
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    // toJSON: {
    //   virtuals: true,
    //   versionKey: false,
    //   transform(doc, ret) {
    //     delete ret.id; // Remove the `id` field
    //   },
    // },
  },
);

//Custom statics method that is used for check product is exist or not
StationeryProductSchema.statics.findProductById = async function (
  productId: string,
) {
  const existingProduct = await StationeryProductModel.findById(productId);
  return existingProduct;
};
//create model and export
export const StationeryProductModel = mongoose.model<
  TStationeryProduct,
  ProductModel
>('Product', StationeryProductSchema);
