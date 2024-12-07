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
exports.default = GetFiles;
const Database_1 = require("../Database");
function GetFiles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield Database_1.File.find({ uploadedBy: req.session.user }, { meta: false, shared: false, uploadedBy: false });
        if (!files || files.length === 0)
            return res.status(404).json({ success: false, error: 'User has not uploaded any file.' });
        console.log(files.length);
        res.json({ success: true, files: files });
    });
}
