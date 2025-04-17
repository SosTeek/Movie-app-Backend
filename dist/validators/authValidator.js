"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.signupValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const enums_1 = require("../enums");
const signupValidator = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    role: joi_1.default.string().valid(enums_1.RoleEnum.admin, enums_1.RoleEnum.user).optional(),
});
exports.signupValidator = signupValidator;
const loginValidator = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.loginValidator = loginValidator;
