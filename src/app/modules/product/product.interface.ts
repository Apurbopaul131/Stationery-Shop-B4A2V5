/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

type TCategory =
  | 'Writing'
  | 'Office Supplies'
  | 'Art Supplies'
  | 'Educational'
  | 'Technology';

//create interface and export
export type TStationeryProduct = {
  name: string;
  brand: string;
  price: number;
  category: TCategory;
  image: string;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
};
export interface ProductModel extends Model<TStationeryProduct> {
  findProductById(productId: string): Promise<TStationeryProduct>;
}
