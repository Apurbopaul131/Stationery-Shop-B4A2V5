import { TStationeryProduct } from "./product.interface";
import { StationeryProductModel } from "./product.model";

//Create product to database
const createProductToDB = async (productData: TStationeryProduct) => {
  const result = await StationeryProductModel.create(productData);
  return result;
};

//get products using search term
const getProductsToDb = async (searchTerm: string) => {
  const query = searchTerm
    ? {
        $or: [
          { category: searchTerm },
          { brand: searchTerm },
          { name: searchTerm },
        ],
      }
    : {};
  const result = await StationeryProductModel.find(query);
  return result;
};

// get specific product by id from db
const getSingleProductToDb = async (id: string) => {
  const result = await StationeryProductModel.findById(id);
  return result;
};

//update product into database
const updateSingleProductToDb = async (
  id: string,
  data: TStationeryProduct
) => {
  const result = await StationeryProductModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};
//delete specific product by id form db
const deleteSingleProductToDb = async (id: string) => {
  const result = await StationeryProductModel.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductToDB,
  getProductsToDb,
  getSingleProductToDb,
  deleteSingleProductToDb,
  updateSingleProductToDb,
};
