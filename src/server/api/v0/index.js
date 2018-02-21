import {Router} from 'express'
import StoriesAPI from './stories'
import NodesAPI from './nodes'

const router = new Router()

router.use('/stories', StoriesAPI)
router.use('/nodes', NodesAPI)

export default router
