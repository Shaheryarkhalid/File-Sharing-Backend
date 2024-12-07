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
exports.default = ShareFile;
const Database_1 = require("../Database");
function ShareFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = req.body.fileName;
        if (!fileName)
            return res.status(400).json({ success: false, error: 'fileName not found in request.' });
        const fileInDatabase = yield Database_1.File.findOne({ name: fileName });
        if (!fileInDatabase)
            return res.status(404).json({ success: false, error: 'File not Found' });
        if (fileInDatabase.uploadedBy.toString() !== req.session.user)
            return res.status(403).json({ success: false, error: 'Unauthorized request.' });
        fileInDatabase.shared = true;
        yield fileInDatabase.save();
        const domain = req.get('host');
        const protocol = req.protocol;
        const sharedLink = `${protocol}://${domain}/file/single/${fileInDatabase.name}`;
        res.json({ success: true, sharedLink: sharedLink });
    });
}
