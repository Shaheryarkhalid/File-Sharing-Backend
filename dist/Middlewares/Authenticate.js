"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Authenticate;
function Authenticate(req, res, next) {
    if (!req.session.user)
        return res.status(401).send({ success: false, error: 'Must login to upload file.' });
    next();
}
