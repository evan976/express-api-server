const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

router.get('/', require('../controller/option.controller').findOptions)

router.put('/', auth, require('../controller/option.controller').updateOptions)

module.exports = router
