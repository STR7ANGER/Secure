import express, { Request, Response } from 'express'
const router = express.Router();
import UserController from '../../controllers/tenant-admin-controller/userController'
import { UserProps } from '../../types/types'

router.post('/add-update-user', async (req: Request<UserProps>, res: Response) => {
    let data = await UserController.addUpdateUser(req.body)
    res.send(data)
})

router.post('/user-list', async (req: Request, res: Response) => {
    let data = await UserController.userList(req.body)
    res.send(data)
})

router.post('/delete-user', async (req: Request, res: Response) => {
    let data = await UserController.deleteUser(req.body)
    res.send(data)
})

export default router;
