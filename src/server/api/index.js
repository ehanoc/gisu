const express = require('express')


const router = express.Router()

router.use('/api/v0', require('./v0'))

module.exports = router
