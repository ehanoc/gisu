import {Router} from 'express'


/**
 * Node API
 * In the future, will manipulate Node resources.
 * --Not implemented yet--
 */

const router = new Router()


router.post('/:nodeId/upvote/', (req, res) => {
  console.log('Upvote', req.params.nodeId)
})


export default router
