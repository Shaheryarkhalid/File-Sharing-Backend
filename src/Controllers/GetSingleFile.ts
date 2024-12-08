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
	if(fileInDatabase.shared){
		fileInDatabase.views = fileInDatabase.views + 1;
		await fileInDatabase.save();
		return  res.sendFile(filePath);
	} 
	if(fileInDatabase.uploadedBy.toString() === req.session.user){
		fileInDatabase.views = fileInDatabase.views + 1;
		await fileInDatabase.save();
		return  res.sendFile(filePath);
	} 
	res.status(401).json({ success: false, error: 'Unauthourized access' });
}