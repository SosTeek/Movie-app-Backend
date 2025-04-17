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
exports.MovieController = void 0;
const services_1 = require("../../services");
class MovieController {
    static findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = req.query.page ? +req.query.page : 1;
            const limit = req.query.limit ? +req.query.limit : 10;
            const searchQuery = req.query.searchQuery;
            const categrory = req.query.category;
            const genreId = req.query.genreId ? req.query.genreId : undefined;
            // calculate your offset based on the page number and limit
            // Offset based pagination
            const offset = (page - 1) * limit;
            /*****
             * 1. get genreId and categrory from req query.
             * 2. send the genreId and categories to the movieService findAll method.
             * 2. check if category has some value
             * ** 2.1 if(false) do nothing
             * ** 2.2 if(true) update the where variable with proper where condition
             * Apply switch case
             * 3. check if genreId has some value
             * ** 3.1 if(false) do nothing
             * ** 3.2 if(true) update the where variable with proper where condition
             (* hint: check the searchQuery)
             */
            const movies = yield new services_1.MovieService().findAll({
                offset: offset,
                limit: limit,
                order: 'id',
                sort: 'asc',
                searchQuery: searchQuery,
                category: categrory,
                genreId: genreId
            });
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Movies fetched successfully.',
                data: movies,
            });
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            if (req.file) {
                payload.thumbnailUrl = req.file.path;
            }
            const movie = yield new services_1.MovieService().create(payload);
            return res.status(201).json({
                success: true,
                status: 201,
                message: 'Movie created successfully.',
                data: movie,
            });
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const data = req.body;
            const update = yield new services_1.MovieService().update(id, data);
            if (update === false) {
                throw new Error(`Couldnot update movie with id ${id}`);
            }
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Movie updated successfully.',
            });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield new services_1.MovieService().delete(id);
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Movie deleted successfully.',
            });
        });
    }
    static findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield new services_1.MovieService().findOne(parseInt(req.params.id));
            return res.status(200).json({
                success: true,
                status: 200,
                message: 'Movie fetched successfully.',
                data: movie,
            });
        });
    }
}
exports.MovieController = MovieController;
