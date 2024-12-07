"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = require("../Controllers");
const authRouter = (0, express_1.Router)();
authRouter.get('/', (req, res) => {
    console.log(req.session);
    if (!req.session.user)
        return res.status(401).json({ isSignedIn: false });
    return res.status(200).json({ isSignedIn: true });
});
authRouter.post('/register', Controllers_1.Register);
authRouter.post('/login', Controllers_1.Login);
exports.default = authRouter;
