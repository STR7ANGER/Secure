import express, { Request, Response } from 'express'
const router = express.Router();
import connectorController from '../controllers/connectorController'
import { ConnectorProps } from '../types/types'
import { upload } from '../helper/fileUpload.helper'

router.post('/add-update-connector', async (req: Request<ConnectorProps>, res: Response) => {
    let data = await connectorController.createUpdateConnector(req.body)
    res.send(data)
})

router.post('/insert-multi-connector', async (req: Request, res: Response) => {
    let data = await connectorController.insertMultiConnector(req.body)
    res.send(data)
})

router.post('/connector-list', async (req: Request, res: Response) => {
    let data = await connectorController.connectorList(req.body)
    res.send(data)
})

router.post('/activate-connector', async (req: Request, res: Response) => {
    let data = await connectorController.activateConnector(req.body)
    res.send(data)
})

router.post('/share-connector', async (req: Request, res: Response) => {
    let data = await connectorController.shareConnector(req.body)
    res.send(data)
})

router.post('/delete-connectorByMaster', async (req: Request, res: Response) => {
    let data = await connectorController.masterDeleteConnector(req.body)
    res.send(data)
})

router.post('/delete-connectorByTenant', async (req: Request, res: Response) => {
    let data = await connectorController.tenantDeleteConnector(req.body)
    res.send(data)
})

router.post('/shareConnectorToUser', async (req: Request, res: Response) => {
    let data = await connectorController.asignConnector(req.body)
    res.send(data)
})

router.post('/connectorListForUser', async (req: Request, res: Response) => {
    let data = await connectorController.connectorListForUser(req.body)
    res.send(data)
})

router.post('/schedule', async (req: Request, res: Response) => {
	let data = await connectorController.connectorScheduleTest(req.body)
	res.send(data)
})

router.post('/add-connector-config',upload.single('file'),async (req: Request, res: Response) => {
		let data = await connectorController.connectorSchedulingDataInsert(req.body)
		res.send(data)
	})
export default router;