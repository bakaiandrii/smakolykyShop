"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const database_1 = require("../../database");
class UserService {
    createUser(user) {
        const userToCreate = new database_1.UserModel(user);
        return userToCreate.save();
    }
    findOneByParam(findObject) {
        return database_1.UserModel.findOne(findObject);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map