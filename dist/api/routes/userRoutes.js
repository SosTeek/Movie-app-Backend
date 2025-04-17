"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../middlewares");
const userRoutes = (0, express_1.Router)();
userRoutes.get('/swastik', (0, middlewares_1.exceptionHandler)(controllers_1.UserController.getUser));
exports.default = userRoutes;
