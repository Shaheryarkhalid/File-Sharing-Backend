import { Router } from "express";
import multer from 'multer'
import { v4 as uid } from 'uuid'
import { Upload } from "../Controllers";
import { Authenticate } from "../Middlewares";
import path from "path";

const storage = multer.diskStorage({
	destination: (req: any, file: any, cb: any) => {
	  cb(null, './uploads');
	},
	filename: (req: any, file: any, cb: any) => {
	  cb(null, uid()  + path.extname(file.originalname));
	}
  });

const uploadMulter = multer({
	storage: storage,
	fileFilter: (req: any, file: any, cb: any) => {
		const fileTypes = /jpeg|jpg|png|gif|mp4|mkv/;
		const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
		const mimetype = fileTypes.test(file.mimetype);
		if (extname && mimetype) {
		return cb(null, true);
		} else {
		cb(new Error('Only images and videos are allowed!'), false);
		}
	}
});

const uploadRouter = Router();

uploadRouter.post('/', Authenticate, uploadMulter.single('uploadedFile'), Upload );

uploadRouter.use((err: any, req: any, res: any, next: any) => {
	if (err instanceof multer.MulterError) {
	  return res.status(400).send({ message: err.message });
	}
	if (err) {
	  return res.status(400).send({ message: err.message });
	}
	next();
  });
export default uploadRouter