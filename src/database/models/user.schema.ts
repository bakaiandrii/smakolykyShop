import {Document, Model, model, Schema} from 'mongoose';
import {IUser} from '../../models';
import {UserRoleEnum, UserStatusEnum} from '../../constants';

export type UserType = IUser & Document

export const UserSchema: Schema = new Schema<IUser>({ //TODO interface
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: UserRoleEnum.USER
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: UserStatusEnum.PENDING
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

export const UserModel: Model<any> = model<UserType>('users', UserSchema);
