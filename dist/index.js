"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const Routes_1 = require("./Routes");
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGOOSE_CONNECTION_STRING)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));
app.get('/', (req, res) => {
    res.json({ success: true, message: 'Home api hit' });
});
app.use('/auth', Routes_1.authRouter);
app.use('/upload', Routes_1.uploadRouter);
app.use('/file', Routes_1.fileRouter);
app.listen(8080, () => console.log('Server Listening on http://localhost:8080'));
