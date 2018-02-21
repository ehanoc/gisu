import {Router} from 'express'


const router = new Router()


router.post('/:nodeId/upvote/', (req, res) => {
  console.log('Upvote', req.params.nodeId)
})


export default router
