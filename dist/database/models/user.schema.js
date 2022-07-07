"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
exports.UserSchema = new mongoose_1.Schema({
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
        default: constants_1.UserRoleEnum.USER
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
        default: constants_1.UserStatusEnum.PENDING
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});
exports.UserModel = mongoose_1.model('users', exports.UserSchema);
//# sourceMappingURL=user.schema.js.map