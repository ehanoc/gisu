const express = require('express')

const Data = require('../../data')

const router = express.Router()


router.get('/', (req, res) => {
  console.log('Stories list')
  res.json([])
})

router.get('/:storyId/', (req, res) => {
  console.log('retrieve story', req.params.storyId)
  res.json(Data.getStory(req.params.storyId))
})



module.exports = router
