export default function Authenticate(req: any, res: any, next: ()=>void)
{
	if(!req.session.user) return res.status(401).send({ success: false, error: 'Must login to upload file.' })
	next();
}