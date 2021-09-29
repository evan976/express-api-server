const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

const { findAll, upload, remove } = require('../controller/image.controller')


router.get('/list', findAll)

router.post('/upload', auth, upload)

router.delete('/delete/:key', auth, remove)

module.exports = router
