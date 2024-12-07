import { Router } from "express";
import { GetFiles, GetSingleFile, ShareFile } from '../Controllers'
import { Authenticate } from "../Middlewares";

const fileRouter = Router();

fileRouter.get('/userfiles', Authenticate, GetFiles)
fileRouter.post('/share', ShareFile )
fileRouter.get('/single/:fileName', GetSingleFile)



export default fileRouter