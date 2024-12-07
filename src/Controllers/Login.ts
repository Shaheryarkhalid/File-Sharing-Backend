import { z } from 'zod';
import { User } from '../Database';
import bcrypt from 'bcrypt';


const signInSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export default async function Login(req: any, res: any) {
	try {
		const formData: any = await signInSchema.parseAsync(req.body);
		const existingUser = await User.findOne({ email: formData.email });
		if(!existingUser) {
			req.session.user = undefined;
			res.status(404).json({ success: false, error: 'No user registered with this email' })
		}else{
			const isMatch = await bcrypt.compare(formData.password, existingUser.password);
			if(!isMatch) return res.status(401).json({ success: false, error: 'Invalid Credentials' })
			req.session.user = existingUser.id;
			console.log(req.session)
			res.status(200).json({ success: true, message: 'Login Successfull' });
		}
	} catch (error: any) {
		console.log(error)
		res.status(400).json({ success: false, error: error.errors ? error.errors : error.message })
	}
}