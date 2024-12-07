"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareFile = exports.GetSingleFile = exports.GetFiles = exports.Upload = exports.Login = exports.Register = void 0;
var Register_1 = require("./Register");
Object.defineProperty(exports, "Register", { enumerable: true, get: function () { return __importDefault(Register_1).default; } });
var Login_1 = require("./Login");
Object.defineProperty(exports, "Login", { enumerable: true, get: function () { return __importDefault(Login_1).default; } });
var Upload_1 = require("./Upload");
Object.defineProperty(exports, "Upload", { enumerable: true, get: function () { return __importDefault(Upload_1).default; } });
var GetFiles_1 = require("./GetFiles");
Object.defineProperty(exports, "GetFiles", { enumerable: true, get: function () { return __importDefault(GetFiles_1).default; } });
var GetSingleFile_1 = require("./GetSingleFile");
Object.defineProperty(exports, "GetSingleFile", { enumerable: true, get: function () { return __importDefault(GetSingleFile_1).default; } });
var ShareFile_1 = require("./ShareFile");
Object.defineProperty(exports, "ShareFile", { enumerable: true, get: function () { return __importDefault(ShareFile_1).default; } });
