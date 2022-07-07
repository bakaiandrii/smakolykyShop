import {UserModel} from '../../database';
import {IUser} from '../../models';

class UserService{
  createUser(user: Partial<IUser>): Promise<IUser> {
    const userToCreate = new UserModel(user);

    return userToCreate.save();
  }

  findOneByParam(findObject: Partial<IUser>) {
    return UserModel.findOne(findObject);
  }
}

export const userService = new UserService();
