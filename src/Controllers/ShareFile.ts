import { File } from "../Database";
export default async function ShareFile(req: any, res: any)
{
	const fileName = req.body.fileName;
	if(!fileName) return res.status(400).json({ success: false, error: 'fileName not found in request.' })
	const fileInDatabase = await File.findOne({ name: fileName });
	if(!fileInDatabase) return res.status(404).json({ success: false, error: 'File not Found' })
	if(fileInDatabase.uploadedBy.toString() !== req.session.user) return res.status(403).json({ success: false, error: 'Unauthorized request.' })
	fileInDatabase.shared = true;
	await fileInDatabase.save();
	const domain = req.get('host');
	const protocol = req.protocol; 
	const sharedLink = `${protocol}://${domain}/file/single/${fileInDatabase.name}`;
	res.json({ success: true, sharedLink: sharedLink })
}