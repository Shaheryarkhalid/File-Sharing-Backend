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
exports.default = Login;
const zod_1 = require("zod");
const Database_1 = require("../Database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signInSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    password: zod_1.z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const formData = yield signInSchema.parseAsync(req.body);
            const existingUser = yield Database_1.User.findOne({ email: formData.email });
            if (!existingUser) {
                req.session.user = undefined;
                res.status(404).json({ success: false, error: 'No user registered with this email' });
            }
            else {
                const isMatch = yield bcrypt_1.default.compare(formData.password, existingUser.password);
                if (!isMatch)
                    return res.status(401).json({ success: false, error: 'Invalid Credentials' });
                req.session.user = existingUser.id;
                console.log(req.session);
                res.status(200).json({ success: true, message: 'Login Successfull' });
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ success: false, error: error.errors ? error.errors : error.message });
        }
    });
}
