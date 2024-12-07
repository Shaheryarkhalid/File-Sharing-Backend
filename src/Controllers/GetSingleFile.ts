import {File} from '../Database'
import path from 'path';
export default async function GetSingleFile(req: any, res: any)
{
	const fileName = req.params.fileName
	const filePath = path.join(path.resolve(), 'uploads', req.params.fileName);
	if(!fileName) return res.status(403).status({ success: false, error: 'File Name must be included in the request.' });
	const fileInDatabase = await File.findOne({ name: fileName });
	console.log(fileInDatabase);
	if(!fileInDatabase) return res.status(403).status({ success: false, error: 'Invalid File Name.' });
	if(fileInDatabase.shared) return  res.sendFile(filePath);
	console.log(fileInDatabase.uploadedBy)
	console.log(req.session.user)
	if(fileInDatabase.uploadedBy.toString() === req.session.user) return  res.sendFile(filePath);
	res.status(401).json({ success: false, error: 'Unauthourized access' });
}