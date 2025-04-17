"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
class Guard {
    static grantAccess(req, res, next) {
        var _a;
        // fetch access token from the req.headers
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split('')[1];
        // check if access token exists
        if (!accessToken) {
            return res.status(500).json({
                success: false,
                message: 'Please provide an access token with your request headers.',
            });
        }
        // decode the provided access token
        const decodedToken = jsonwebtoken_1.default.verify(accessToken, config_1.jwtSecret);
        // if( invalid access token ) return error response
        if (!decodedToken) {
            return res.status(500).json({
                success: false,
                message: 'Invalid or expired access token.',
            });
        }
        // if(valid access token ) next()
        req.user = decodedToken;
        next();
    }
    static grantRole(role) {
        return (req, res, next) => {
            if (req.user.role === role) {
                next();
            }
            else {
                return res.status(400).json({
                    message: 'You are not authorized to perform this task!'
                });
            }
        };
    }
}
exports.Guard = Guard;
