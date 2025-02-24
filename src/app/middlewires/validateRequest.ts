import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (validationSchema: AnyZodObject) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    //check client data by validation schema
    try {
      await validationSchema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });
      next();
    } catch (err) {
      //send to global error handler
      next(err);
    }
  };
};
export default validateRequest;
