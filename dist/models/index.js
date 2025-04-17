"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const director_1 = __importDefault(require("./director"));
const genre_1 = __importDefault(require("./genre"));
const movie_1 = __importDefault(require("./movie"));
const user_1 = __importDefault(require("./user"));
const Models = {
    Genre: genre_1.default,
    Director: director_1.default,
    Movie: movie_1.default,
    User: user_1.default,
};
exports.default = Models;
