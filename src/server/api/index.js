import {Router} from 'express'
import apiV0 from './v0/'

const router = new Router()

router.use('/api/v0', apiV0)

export default router
