import { Router } from 'express'
import { Register, Login } from '../Controllers';

const authRouter = Router();

authRouter.get('/', (req: any, res: any) => {
	console.log(req.session)
	if(!req.session.user) return res.status(401).json({ isSignedIn: false })
	return res.status(200).json({ isSignedIn: true })
})
authRouter.post('/register', Register)
authRouter.post('/login', Login)

export default authRouter