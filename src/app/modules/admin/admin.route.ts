import express from 'express';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { ProductValidatios } from '../product/product.validation';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';

//create router object
const router = express.Router();

//create post api to handle post requsest from client
router.post(
  '/admin/products',
  auth(USER_ROLE?.admin),
  validateRequest(ProductValidatios.createProductValidationSchema),
  AdminControllers.createProduct,
);

//create delete api to handle delete request from client
router.delete(
  '/admin/products/:productId',
  auth(USER_ROLE?.admin),
  AdminControllers.deleteSingleProduct,
);

router.patch(
  '/admin/products/:productId',
  auth(USER_ROLE?.admin),
  validateRequest(ProductValidatios.updateProductValidationSchema),
  AdminControllers.updateSingleProduct,
);

//user blocked by update route
router.patch(
  '/admin/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.blockedUserByAdmin,
);
//export

export const AdminRouter = router;
