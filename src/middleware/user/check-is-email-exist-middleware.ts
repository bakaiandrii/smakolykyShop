import { NextFunction, Request, Response } from 'express';
import { customErrors, ErrorHandler } from '../../errors';
import { userService } from '../../services';

export const checkIsEmailExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const userByEmail = await userService.findOneByParam({ email });

  if (userByEmail) {
    return next(new ErrorHandler(
      400,
      customErrors.BAD_REQUEST_USER_REGISTERED.message,
      customErrors.BAD_REQUEST_USER_REGISTERED.code
    ));
  }

  next();
};
