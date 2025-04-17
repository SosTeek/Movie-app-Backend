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
exports.MovieService = void 0;
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("../models"));
class MovieService {
    findAll(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let where;
            if (args.searchQuery) {
                where = {
                    title: {
                        [sequelize_1.Op.like]: `%${args.searchQuery}%`,
                    },
                };
            }
            if (args.category) {
                switch (args.category) {
                    case 'latest':
                        // condition: released after 2024
                        const date = '2024-01-01';
                        where = Object.assign(Object.assign({}, where), { releasedAt: {
                                [sequelize_1.Op.gt]: date,
                            } });
                        break;
                    case 'top-rated':
                        // condition: the movies whose rating is over 8.00
                        const baseRating = '8.00';
                        where = Object.assign(Object.assign({}, where), { avgRatings: {
                                [sequelize_1.Op.gte]: baseRating,
                            } });
                        break;
                    case 'popular':
                        // condition: the movies whose imdb rating is over 8.00
                        const baseImdbScore = '7.00';
                        where = Object.assign(Object.assign({}, where), { imdbScore: {
                                [sequelize_1.Op.gte]: baseImdbScore,
                            } });
                        break;
                }
            }
            if (args.genreId) {
                where = Object.assign(Object.assign({}, where), { genreId: parseInt(args.genreId) });
            }
            const data = yield models_1.default.Movie.findAll({
                offset: args.offset,
                limit: args.limit,
                order: [[args.order, args.sort]],
                where,
            });
            return data;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield models_1.default.Movie.findByPk(id);
            if (!data) {
                throw new Error(`Movie doesnot exist for id: ${id}`);
            }
            return data;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield models_1.default.Movie.create(data);
            return movie;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield models_1.default.Movie.update(data, {
                where: {
                    id: id,
                },
            });
            return update[0] === 0 ? false : true;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield models_1.default.Movie.destroy({
                where: {
                    id: id,
                },
            });
            return deleted;
        });
    }
}
exports.MovieService = MovieService;
