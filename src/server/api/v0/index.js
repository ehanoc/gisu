import {Router} from 'express'
import StoriesAPI from './stories'
import NodesAPI from './nodes'
import MediaAPI from './media'

/**
 * API version 0
 */

const router = new Router()

router.use('/stories', StoriesAPI)
router.use('/nodes', NodesAPI)
router.use('/media', MediaAPI)

export default router
