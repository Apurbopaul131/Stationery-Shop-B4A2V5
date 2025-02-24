/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import AppError from '../error/AppError';
import { verifyToken } from '../modules/auth/auth.uitls';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../uitls/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    //check if token is missing from client
    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }
    //Remove the extra keyword Bearer from token
    token = (req.headers.authorization as string).replace(/^Bearer\s/, '');
    // checking if the given token is valid
    let decoded;
    try {
      decoded = verifyToken(token, config.jwt_access_secret as string);
    } catch (err) {
      throw new AppError(401, 'You are not authorized');
    }

    //destructure the decoded property

    const { email, role } = decoded;
    const isUserExist = await User.checkUserExistByEmailId(email);
    //check if user is exist
    if (!isUserExist) {
      throw new AppError(404, 'User not found!');
    }
    //check if user is blocked
    if (isUserExist?.isBlocked) {
      throw new AppError(403, 'User is blocked!');
    }
    //check Authorization who are authorize to access the data
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'Invalid credentials');
    }
    req.user = decoded;
    next();
  });
};
export default auth;
