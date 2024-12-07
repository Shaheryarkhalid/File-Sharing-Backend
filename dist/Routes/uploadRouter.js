"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const Controllers_1 = require("../Controllers");
const Middlewares_1 = require("../Middlewares");
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, (0, uuid_1.v4)() + path_1.default.extname(file.originalname));
    }
});
const uploadMulter = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|mp4|mkv/;
        const extname = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        else {
            cb(new Error('Only images and videos are allowed!'), false);
        }
    }
});
const uploadRouter = (0, express_1.Router)();
uploadRouter.post('/', Middlewares_1.Authenticate, uploadMulter.single('uploadedFile'), Controllers_1.Upload);
uploadRouter.use((err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError) {
        return res.status(400).send({ message: err.message });
    }
    if (err) {
        return res.status(400).send({ message: err.message });
    }
    next();
});
exports.default = uploadRouter;
