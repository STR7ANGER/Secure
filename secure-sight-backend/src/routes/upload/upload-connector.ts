import express, { Request, Response } from 'express'
const router = express.Router();
// import { UserProps } from '../../types/types'
import uploadConnectorController from '../../controllers/uploadConnectorController'

router.post('/', async (req: Request, res: Response) => {
    let data = await uploadConnectorController.uploadConnector(req)
    res.send(data)
})

export default router;
