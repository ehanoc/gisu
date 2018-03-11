import {Router} from 'express'
import apiV0 from './v0/'


// API routes
// Versioned API to allow future versions of it

const router = new Router()

router.use('/api/v0', apiV0)

export default router
