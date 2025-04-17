"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenre = void 0;
const joi_1 = __importDefault(require("joi"));
const createGenre = joi_1.default.object({
    name: joi_1.default.string().label('Name').required(),
});
exports.createGenre = createGenre;
