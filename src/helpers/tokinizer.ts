import * as jwt from 'jsonwebtoken';
import { config } from '../config';

import { ActionEnum } from '../constants';

export const tokinizer = (action: ActionEnum): {access_token: string, refresh_token: string} => {
  let access_token = '';
  const refresh_token = '';

  switch (action){
    case ActionEnum.USER_REGISTER :
      access_token = jwt.sign({}, config.JWT_CONFIRM_EMAIL_SECRET, {expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME});

  }

  return {
    access_token,
    refresh_token
  };

};
