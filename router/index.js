const express = require('express')

const router = express.Router()

// user
router.use(require('./user'))

// profile
router.use('/profiles', require('./profile'))

module.exports = router