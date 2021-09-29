/**
 * @module 路由统一出口
 */

const express = require('express')
const { INFO } = require('../config/config.default')
const auth = require('../utils/auth')

const router = express.Router()

router.get('/', (req, res) => {
  res.jsonp(INFO)
})

router.use(require('./user'))

router.use('/articles', require('./article'))

router.use('/categories', require('./category'))

router.use('/tags', require('./tag'))

router.use('/options', require('./option'))

router.post('/upload', auth, require('../controller/upload.controller').uploadFiles)

module.exports = router
