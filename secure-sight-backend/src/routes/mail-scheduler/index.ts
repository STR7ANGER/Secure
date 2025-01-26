import express, { Request, Response } from 'express'
import schedulerController from '../../controllers/schedulerController'
const router = express.Router()

router.post('/email-report', async (req: Request, res: Response) => {
	let data = await schedulerController.scheduleMail(req.body)
	res.send(data)
})

export default router
