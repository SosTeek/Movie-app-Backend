"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../../services");
const config_1 = require("../../config");
class AuthController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const userExists = yield new services_1.UserService().findOne(userData.email);
            if (userExists) {
                return res.status(500).json({
                    message: `User with email: ${userData.email} already exists!`,
                    success: false,
                });
            }
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 12);
            const user = yield new services_1.UserService().create({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
            });
            return res.status(200).json({
                message: 'Signup successful. You can proceed to login.',
                success: true,
                data: user,
            });
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const userExists = yield new services_1.UserService().findOne(userData.email);
            if (!userExists) {
                return res.status(500).json({
                    message: `Invalid email: ${userData.email}`,
                    success: false,
                });
            }
            const doesPasswordMatch = yield bcrypt_1.default.compare(userData.password, userExists.password);
            if (!doesPasswordMatch) {
                return res.status(500).json({
                    message: `Invalid Password`,
                    success: false,
                });
            }
            const accessToken = jsonwebtoken_1.default.sign({
                id: userExists.id,
                email: userExists.email,
                name: userExists.name,
                role: userExists.role,
            }, config_1.jwtSecret, { expiresIn: '1d' });
            return res.status(200).json({
                message: 'User Logged in successfully.',
                success: true,
                data: {
                    accessToken,
                },
            });
        });
    }
}
exports.AuthController = AuthController;
