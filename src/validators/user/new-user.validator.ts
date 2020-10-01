import * as Joi from 'joi';
import {RegExpEnum} from '../../constants';

export const newUserValidator = Joi.object({
  name: Joi.string().alphanum().trim().min(2).max(25).required(),
  surname: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().regex(RegExpEnum.email).required(),
  password: Joi.string().trim().regex(RegExpEnum.password).required(),
  age: Joi.number().integer().min(1).max(120).required(),
  phone:Joi.string().trim().regex(RegExpEnum.phone),
  gender: Joi.string().trim().allow('male', 'female').required()
});
