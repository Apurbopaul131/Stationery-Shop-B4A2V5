import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { searchableFields } from './product.constant';
import { StationeryProductModel } from './product.model';

// get all product form DB
const getAllproductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    StationeryProductModel.find({ isDeleted: false }),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;
  return {
    meta,
    result,
  };
};
// get specific product by id from db
const getSingleProductToDb = async (id: string) => {
  const isDeleted = await StationeryProductModel.findOne({
    _id: id,
    isDeleted: true,
  });
  if (isDeleted) {
    throw new AppError(404, 'Product not found!');
  }
  const result = await StationeryProductModel.findById(id).select(
    'name brand price category description quantity inStock image rating',
  );
  if (!result) {
    throw new AppError(404, 'Product not found!');
  }
  return result;
};

//export
export const ProductServices = {
  getSingleProductToDb,
  getAllproductFromDB,
};
