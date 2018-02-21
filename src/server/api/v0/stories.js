import {Router} from 'express'
import {getStory} from '../../data'


const router = new Router()


router.get('/', (req, res) => {
  console.log('Stories list')
  res.json([])
})

router.get('/:storyId/', (req, res) => {
  console.log('retrieve story', req.params.storyId)
  res.json(getStory(req.params.storyId))
})


export default router
