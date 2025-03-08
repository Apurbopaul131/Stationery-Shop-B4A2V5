import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { searchableFields } from './product.constant';
import { StationeryProductModel } from './product.model';

//get products using search term
// const getProductsToDb = async (searchTerm: string) => {
//   const query = searchTerm
//     ? {
//         $or: [
//           { category: searchTerm },
//           { brand: searchTerm },
//           { name: searchTerm },
//         ],
//       }
//     : {};
//   const result = await StationeryProductModel.find(query);
//   return result;
// };
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
    'name brand price category description quantity inStock image',
  );
  if (!result) {
    throw new AppError(404, 'Product not found!');
  }
  return result;
};

export const ProductServices = {
  getSingleProductToDb,
  getAllproductFromDB,
};
