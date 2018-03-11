import {Router} from 'express'
import StoriesAPI from './stories'
import NodesAPI from './nodes'

/**
 * API version 0
 */

const router = new Router()

router.use('/stories', StoriesAPI)
router.use('/nodes', NodesAPI)

export default router
