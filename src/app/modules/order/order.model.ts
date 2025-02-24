import mongoose, { Schema } from 'mongoose';
import { orderStatus } from './order.constants';
import { TOrder } from './order.interface';

//order schema
const OrderSchema = new mongoose.Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'Product',
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price must be a positive number'],
    },
    status: {
      type: String,
      enum: {
        values: orderStatus,
        message: '{VALUE} is not supported',
      },
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the model
const OrderModel = mongoose.model<TOrder>('Order', OrderSchema);

//export
export default OrderModel;
