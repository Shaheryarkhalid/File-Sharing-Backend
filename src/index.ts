import mongoose from 'mongoose';
import express, { Request, Response, Application } from 'express'
import cors from 'cors';
import session from 'express-session';
import { authRouter, uploadRouter, fileRouter } from './Routes';
const app = express();

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING as string)
	.then(() => {
	  console.log('Connected to MongoDB');
	})
	.catch((error) => {
	  console.error('Error connecting to MongoDB:', error);
	});

app.use(cors({
	origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}));
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET_KEY as string, 
    resave: false,              
    saveUninitialized: true,    
    cookie: {
        httpOnly: true,        
        secure: false,         
        maxAge: 1000 * 60 * 60  
    }
}));

app.get('/api/', (req, res) => {
	 res.json({ success: true, message: 'Home api hit' });
})
app.use('/api/auth', authRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/file', fileRouter)
app.listen(8080, () => console.log('Server Listening on http://localhost:8080'))
