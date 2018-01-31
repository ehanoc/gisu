const express = require('express')


const router = express.Router()

router.use('/stories', require('./stories'))
router.use('/nodes', require('./nodes'))

module.exports = router
