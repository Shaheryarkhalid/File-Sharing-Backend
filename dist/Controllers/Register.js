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
exports.default = Register;
const zod_1 = require("zod");
const Database_1 = require("../Database");
const bcrypt = require('bcrypt');
const signUpSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(4, { message: 'firstName must be at least 4 characters long' }).max(14, { message: 'firstName must be at most 14 characters long' }),
    lastName: zod_1.z.string().min(4, { message: 'lastName must be at least 4 characters long' }).max(14, { message: 'lastName must be at most 14 characters long' }),
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    password: zod_1.z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: zod_1.z.string().min(8, { message: 'Confirm Password must be at least 8 characters long' })
});
function Register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const formData = yield signUpSchema.safeParseAsync(req.body);
            if (formData.password !== formData.confirmPassword)
                throw new Error('Password and Confirm Password must be same.');
            const existingUser = yield Database_1.User.findOne({ email: formData.data.email });
            if (existingUser) {
                throw new Error('Email already exists.');
            }
            formData.confirmPassword = undefined;
            const salt = yield bcrypt.genSalt(10);
            formData.data.password = yield bcrypt.hash(formData.data.password, salt);
            const newUser = new Database_1.User(formData.data);
            yield newUser.save();
            req.session.user = newUser.id;
            res.json({ success: true, message: 'Sign up successful' });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ success: false, messgae: "User Registration failed", error: error.errors ? error.errors : error.message });
        }
    });
}
