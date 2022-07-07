import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { emailService, userService } from '../../services';
import { newUserValidator } from '../../validators';
import { IUser } from '../../models';
import { hashPassword, tokinizer } from '../../helpers';
import { ActionEnum } from '../../constants';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;
    const { error } = Joi.validate(user, newUserValidator);
    if (error) {
      return next(new Error(error.details[0].message));
    }

    user.password = await hashPassword(user.password);

    await userService.createUser(user);

    const {access_token} = tokinizer(ActionEnum.USER_REGISTER);

    // TODO token in DB

    await emailService.sendEmailService(user.email, ActionEnum.USER_REGISTER, {token: access_token});
    res.sendStatus(201);
  }
}

export const userController = new UserController();
