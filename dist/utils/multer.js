"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multer = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Multer {
    constructor(uploadDir = 'uploads') {
        this.storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                if (!fs_1.default.existsSync(uploadDir)) {
                    fs_1.default.mkdirSync(uploadDir, { recursive: true });
                }
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                cb(null, `${file.fieldname}-${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
            },
        });
    }
    static get() {
        if (!Multer.instance) {
            Multer.instance = new Multer();
        }
        return Multer.instance;
    }
    fileFilter(req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            return cb(new Error('Only images and PDFs are allowed!'));
        }
    }
    uploadSingle(fieldName) {
        return (req, res, next) => {
            const upload = (0, multer_1.default)({ storage: this.storage, fileFilter: this.fileFilter, limits: {
                    fileSize: 10 * 1024 * 1024, // in bytes
                }, }).single(fieldName);
            upload(req, res, (err) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                next();
            });
        };
    }
    uploadMultiple(fieldName, maxCount) {
        return (req, res, next) => {
            const upload = (0, multer_1.default)({ storage: this.storage, fileFilter: this.fileFilter }).array(fieldName, maxCount);
            upload(req, res, (err) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                next();
            });
        };
    }
}
const multerInstance = new Multer();
exports.Multer = multerInstance;
