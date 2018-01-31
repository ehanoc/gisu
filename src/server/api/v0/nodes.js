const express = require('express')


const router = express.Router()


router.post('/:nodeId/upvote/', (req, res) => {
  console.log('Upvote', req.params.nodeId)
})



module.exports = router
