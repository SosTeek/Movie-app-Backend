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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectorController = void 0;
const services_1 = require("../../services");
class DirectorController {
    static findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const directors = yield new services_1.DirectorService().findAll();
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Directors fetched successfully.',
                data: directors,
            });
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const director = yield new services_1.DirectorService().create(payload);
            return res.status(201).json({
                success: true,
                status: 201,
                message: 'Director created successfully.',
                data: director,
            });
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const data = req.body;
            const update = yield new services_1.DirectorService().update(id, data);
            if (update === false) {
                throw new Error(`Couldnot update director with id ${id}`);
            }
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Director updated successfully.',
            });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield new services_1.DirectorService().delete(id);
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Director deleted successfully.',
            });
        });
    }
    static findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const director = yield new services_1.DirectorService().findOne(parseInt(req.params.id));
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Director fetched successfully.',
                data: director,
            });
        });
    }
}
exports.DirectorController = DirectorController;
