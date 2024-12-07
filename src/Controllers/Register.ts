import { z } from 'zod';
import { User } from '../Database';
const bcrypt = require('bcrypt');

const signUpSchema = z.object({
    firstName: z.string().min(4, { message: 'firstName must be at least 4 characters long' }).max(14, { message: 'firstName must be at most 14 characters long' }),
    lastName: z.string().min(4, { message: 'lastName must be at least 4 characters long' }).max(14, { message: 'lastName must be at most 14 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 8 characters long' })
})
export default async function Register(req: any, res: any) {
    try {
        const formData: any = await signUpSchema.safeParseAsync(req.body);
		if(formData.password !==  formData.confirmPassword) throw new Error('Password and Confirm Password must be same.')
		const existingUser = await User.findOne({ email: formData.data.email });
        if (existingUser) {
            throw new Error('Email already exists.');
        }
		formData.confirmPassword = undefined;
		const salt = await bcrypt.genSalt(10);
		formData.data.password = await bcrypt.hash(formData.data.password, salt);
		const newUser =  new User(formData.data);
		await newUser.save();
		req.session.user = newUser.id;
		res.json({ success: true, message: 'Sign up successful' });
    } catch (error: any) {
		console.log(error)
        res.status(400).json({ success: false, messgae:"User Registration failed", error: error.errors ? error.errors : error.message })
    }
}