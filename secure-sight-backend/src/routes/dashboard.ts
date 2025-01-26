import express, { Request, Response } from 'express'
const router = express.Router();
import dashboardController from '../controllers/dashboardController'

router.post('/create-dashboard', async (req: Request, res: Response) => {
    let data = await dashboardController.createDashboard(req.body)
    res.send(data)
})
router.post('/update-dashboard', async (req: Request, res: Response) => {
    let data = await dashboardController.updateDashboard(req.body)
    res.send(data)
})
router.post('/get-dashboard', async (req: Request, res: Response) => {
    let data = await dashboardController.getDashboard(req.body)
    res.send(data)
})
router.post('/delete-dashboard', async (req: Request, res: Response) => {
    let data = await dashboardController.deleteDashboard(req.body)
    res.send(data)
})
router.post('/add-dashborad-data', async (req: Request, res: Response) => {
    let data = await dashboardController.addDashboardData(req.body)
    res.send(data)
})
router.post('/update-table-title', async (req: Request, res: Response) => {
    let data = await dashboardController.updateTableTitle(req.body)
    res.send(data)
})
router.post('/get-dashborad-data', async (req: Request, res: Response) => {
    let data = await dashboardController.getDashboardData(req.body)
    res.send(data)
})
router.post('/get-dashborad-data', async (req: Request, res: Response) => {
    let data = await dashboardController.getDashboardData(req.body)
    res.send(data)
})
router.post('/delete-dashborad-data', async (req: Request, res: Response) => {
    let data = await dashboardController.deleteDashboardData(req.body)
    res.send(data)
})

export default router;