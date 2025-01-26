import express, { Request, Response } from 'express'
const router = express.Router();
import TenantController from '../../controllers/master-admin-controller/tenantController'
// import ConnectorController from '../../controllers/connectorController'
import { TenantProps, TenantInfoProps, ConnectorProps } from '../../types/types'

router.post('/add-update-tenant', async (req: Request<TenantInfoProps>, res: Response) => {
    let data = await TenantController.createUpdateTenant(req.body)
    res.send(data)
})

router.post('/delete-tenant', async (req: Request, res: Response) => {
    let data = await TenantController.deleteTenant(req.body)
    res.send(data)
})

router.post('/list', async (req: Request, res: Response) => {
    let data = await TenantController.list(req.body)
    res.send(data)
})

// router.post('/add-update-connector', async (req: Request<ConnectorProps>, res: Response) => {
//     let data = await ConnectorController.createUpdateConnector(req.body)
//     res.send(data)
// })

export default router;
