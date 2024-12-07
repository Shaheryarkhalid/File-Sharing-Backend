import { File } from "../Database"

export default async function GetFiles(req: any, res: any){
	const files = await File.find({ uploadedBy: req.session.user }, { meta: false, shared: false, uploadedBy: false });
	if(!files || files.length === 0) return res.status(404).json({ success: false, error: 'User has not uploaded any file.' })
	console.log(files.length)
	res.json({success: true, files: files})
}