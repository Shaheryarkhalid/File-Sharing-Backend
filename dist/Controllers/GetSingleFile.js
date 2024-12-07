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
exports.default = GetSingleFile;
const Database_1 = require("../Database");
const path_1 = __importDefault(require("path"));
function GetSingleFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = req.params.fileName;
        const filePath = path_1.default.join(path_1.default.resolve(), 'uploads', req.params.fileName);
        if (!fileName)
            return res.status(403).status({ success: false, error: 'File Name must be included in the request.' });
        const fileInDatabase = yield Database_1.File.findOne({ name: fileName });
        console.log(fileInDatabase);
        if (!fileInDatabase)
            return res.status(403).status({ success: false, error: 'Invalid File Name.' });
        if (fileInDatabase.shared)
            return res.sendFile(filePath);
        console.log(fileInDatabase.uploadedBy);
        console.log(req.session.user);
        if (fileInDatabase.uploadedBy.toString() === req.session.user)
            return res.sendFile(filePath);
        res.status(401).json({ success: false, error: 'Unauthourized access' });
    });
}
