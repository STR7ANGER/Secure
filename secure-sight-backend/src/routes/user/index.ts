import express, { Request, Response } from 'express'
const router = express.Router();
// import UserController from '../../controllers/user-controller'
import { UserProps } from '../../types/types'

router.post('/add-update-user', async (req: Request<UserProps>, res: Response) => {
    // let data = await UserController.addUpdateUser(req.body)
    // res.send(data)
})

export default router;
