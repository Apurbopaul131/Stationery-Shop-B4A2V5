import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import { TStationeryProduct } from '../product/product.interface';
import { StationeryProductModel } from '../product/product.model';
import { User } from '../user/user.model';

//Create product to database
const createProductToDB = async (productData: TStationeryProduct) => {
  const isProductExist = await StationeryProductModel.findOne({
    name: productData?.name,
    category: productData?.category,
    isDeleted: false,
  });
  if (isProductExist) {
    throw new AppError(409, 'Product already exist!');
  }
  const result = await StationeryProductModel.create(productData);
  return result;
};

//update product into database
const updateSingleProductToDb = async (
  id: string,
  data: TStationeryProduct,
) => {
  const isDeleted = await StationeryProductModel.findOne({
    _id: id,
    isDeleted: true,
  });
  if (isDeleted) {
    throw new AppError(404, 'Product not found!');
  }
  //check product exist or not
  const product = await StationeryProductModel.findById(id);
  if (!product) {
    throw new AppError(404, 'Product not found!');
  }
  const result = await StationeryProductModel.findByIdAndUpdate(id, data, {
    new: true,
  }).select('name brand price category description quantity inStock image');
  return result;
};

//delete specific product by id form db
const deleteSingleProductToDb = async (id: string) => {
  const isDeleted = await StationeryProductModel.findOne({
    _id: id,
    isDeleted: true,
  });
  if (isDeleted) {
    throw new AppError(404, 'Product not found!');
  }
  //check product exist or not
  const product = await StationeryProductModel.findById(id);
  if (!product) {
    throw new AppError(404, 'Product not found!');
  }
  const result = await StationeryProductModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const blockedUserByAdminIntoDB = async (
  authenticateUserInfo: JwtPayload,
  userId: string,
) => {
  const isAdminExist = await User.checkUserExistByEmailId(
    authenticateUserInfo?.email,
  );
  //check if authenticate admin exist
  if (!isAdminExist) {
    throw new AppError(404, 'Admin not found!');
  }
  //check if admin is blocked
  if (isAdminExist?.isBlocked) {
    throw new AppError(403, 'Admin is blocked!');
  }
  const isUserExist = await User.findById(userId);
  //check if user is exist
  if (!isUserExist) {
    throw new AppError(404, 'User not found!');
  }
  //check if user is already blocked
  if (isUserExist.isBlocked) {
    throw new AppError(403, 'User is already blocked!');
  }
  if (isUserExist && isUserExist.role !== 'user') {
    throw new AppError(403, 'You may provided admin id!');
  }
  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    {
      new: true,
    },
  );
  return result;
};
//export
export const AdminServices = {
  createProductToDB,
  updateSingleProductToDb,
  deleteSingleProductToDb,
  blockedUserByAdminIntoDB,
};
