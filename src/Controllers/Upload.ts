import { File }from "../Database"
export default async function Upload(req: any, res: any)
{
	const newFile = new File({
		name: req.file.filename,
		shared: false,
		uploadedBy: req.session.user	
	})
	await newFile.save();
	res.json({ success: true, file: newFile})
}