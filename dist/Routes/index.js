"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRouter = exports.uploadRouter = exports.authRouter = void 0;
var AuthenticationRoutes_1 = require("./AuthenticationRoutes");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(AuthenticationRoutes_1).default; } });
var UploadRouter_1 = require("./UploadRouter");
Object.defineProperty(exports, "uploadRouter", { enumerable: true, get: function () { return __importDefault(UploadRouter_1).default; } });
var FileRouter_1 = require("./FileRouter");
Object.defineProperty(exports, "fileRouter", { enumerable: true, get: function () { return __importDefault(FileRouter_1).default; } });
