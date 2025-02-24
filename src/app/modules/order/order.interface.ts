import { Types } from 'mongoose';

export type TOrderStatus = 'Pending' | 'Shipping';
//interface
export type TOrder = {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: TOrderStatus;
};
