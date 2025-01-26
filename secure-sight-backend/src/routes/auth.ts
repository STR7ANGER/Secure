import express, { Request, Response } from 'express'
import passport from 'passport'
const router = express.Router();
import { UserProps } from '../types/types'
import AuthController from '../controllers/authController'
import { setDbName } from '../utils/auth-util'

router.post('/register', async (req: Request<UserProps>, res: Response) => {
    try {
        let data = await AuthController.register(req.body)
        res.send({
            success: true,
            data
        })
    }catch(e: any) {
        res.status(400).send({
            success: false,
            data: {
                message: e.message
            }
        })
    }
})

router.post('/login',
    // CompareDate,
    setDbName, async (req: Request<UserProps>, res: Response) => {
    try {
        const data = await AuthController.login(req.body);

        if (!data) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Handle invalid login attempts
        }

        res.status(200).json(data); // Send back user data or token on successful login
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' }); // Generic error message for server issues
    }
});
router.post('/info', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    res.send(req.user)
})

router.post('/generate-license-key', async (req: Request<UserProps>, res: Response) => {
    let data = await AuthController.licenseKey(req.body)
    res.send(data)
})

export default router;