import express from 'express'
const router = express.Router()
import auth from './auth'
import master from './master-admin'
import tenant from './tenant-admin'
import connector from './connector'
import uploadConnector from './upload/upload-connector'
import elastic from './elastic'
import dashboard from './dashboard'
import report from './report'
import mailScheduler from './mail-scheduler'



router.use('/auth', auth)
router.use('/master', master)
router.use('/tenant', tenant)
router.use('/connector', connector)
router.use('/upload-connector', uploadConnector)
router.use('/elastic', elastic)
router.use('/dashboard', dashboard)
router.use('/report', report)
router.use('/schedule', mailScheduler)

export default router
