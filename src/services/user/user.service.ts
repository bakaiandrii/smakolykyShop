import {UserModel} from '../../database';
import {IUser} from '../../models';

class UserService{
  createUser(user: Partial<IUser>): Promise<IUser> {
    const userToCreate = new UserModel(user);

    return userToCreate.save();
  }
}

export const userService = new UserService();
