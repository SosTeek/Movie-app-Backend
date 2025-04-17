"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multer = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
class Multer {
    constructor() {
        this.uploadSingle = (fieldName) => {
            return (req, res, next) => {
                const upload = (0, multer_1.default)({
                    storage: this.storage,
                }).single(fieldName);
                upload(req, res, (err) => {
                    if (err) {
                        res.status(400).json({ error: err.message });
                        return;
                    }
                    next();
                });
            };
        };
        this.storage = multer_1.default.diskStorage({
            destination(req, file, callback) {
                // callback(null, '/uploads');
                callback(null, path_1.default.join(__dirname, '../../uploads'));
            },
            filename(req, file, callback) {
                const filename = `${Date.now()}-${file.originalname}`;
                callback(null, filename);
            },
        });
    }
}
exports.Multer = Multer;
