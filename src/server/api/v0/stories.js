import {Router} from 'express'
import { getStory, saveStory } from '../../data'


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

// Save/Update a story
router.post('/:storyId/', (req, res) => {
  const { storyId } = req.params
  const story = req.body
  console.log('save story', storyId)

  saveStory(storyId, story)

  res.json({ message: 'success' })
})


export default router
