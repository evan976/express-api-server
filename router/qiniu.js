const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

const { findAll, upload, remove } = require('../controller/qiniu.controller')


router.get('/', findAll)

router.post('/upload', auth, upload)

router.delete('/:key', auth, remove)

module.exports = router
