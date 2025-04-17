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
exports.GenreController = void 0;
const services_1 = require("../../services");
class GenreController {
    static findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = yield new services_1.GenreService().findAll();
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Genres fetched successfully.',
                data: genres,
            });
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const genre = yield new services_1.GenreService().create(payload);
            return res.status(201).json({
                success: true,
                status: 201,
                message: 'Genre created successfully.',
                data: genre,
            });
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const data = req.body;
            const update = yield new services_1.GenreService().update(id, data);
            if (update === false) {
                throw new Error(`Couldnot update genre with id ${id}`);
            }
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Genre updated successfully.',
            });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield new services_1.GenreService().delete(id);
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Genre deleted successfully.',
            });
        });
    }
}
exports.GenreController = GenreController;
