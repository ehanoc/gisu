import {Router} from 'express'
import {getStory} from '../../data'


/**
 * Stories API
 * Get the list of stories or a single story by id.
 */

const router = new Router()

// List stories (Not implemented)
router.get('/', (req, res) => {
  console.log('Stories list')
  res.json([])
})

// Get story by ID
router.get('/:storyId/', (req, res) => {
  console.log('retrieve story', req.params.storyId)
  res.json(getStory(req.params.storyId))
})


export default router
