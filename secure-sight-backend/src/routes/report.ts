import express, { Request, Response } from 'express'
const router = express.Router();
import reportController from '../controllers/reportController'

router.post('/create-report', async (req: Request, res: Response) => {
    let data = await reportController.createReport(req.body)
    res.send(data)
})
router.post('/get-report', async (req: Request, res: Response) => {
    let data = await reportController.getReport(req.body)
    res.send(data)
})
router.post('/update-report', async (req: Request, res: Response) => {
    let data = await reportController.updateReport(req.body)
    res.send(data)
})
router.post('/delete-report', async (req: Request, res: Response) => {
    let data = await reportController.deleteReport(req.body)
    res.send(data)
})
router.post('/add-report-data', async (req: Request, res: Response) => {
    let data = await reportController.addReportData(req.body)
    res.send(data)
})
router.post('/update-reportTable-title', async (req: Request, res: Response) => {
    let data = await reportController.updateReportTableTitle(req.body)
    res.send(data)
})
router.post('/get-report-data', async (req: Request, res: Response) => {
    let data = await reportController.getReportData(req.body)
    res.send(data)
})
router.post('/get-report-data', async (req: Request, res: Response) => {
    let data = await reportController.getReportData(req.body)
    res.send(data)
})
router.post('/delete-report-data', async (req: Request, res: Response) => {
    let data = await reportController.deleteReportData(req.body)
    res.send(data)
})
router.post('/merge-report', async (req: Request, res: Response) => {
	await reportController.crossTableReport(req.body, res)
})

export default router;