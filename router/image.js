const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

const { findAll, upload } = require('../controller/image.controller')


router.get('/list', findAll)

router.post('/upload', auth, upload)

module.exports = router
