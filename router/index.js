/**
 * @module 路由统一出口
 */

const express = require('express')
const { info } = require('../config/config.default')

const router = express.Router()

router.get('/', (req, res) => {
  res.jsonp(info)
})

router.use(require('./user'))

router.use('/articles', require('./article'))

router.use('/categories', require('./category'))

router.use('/tags', require('./tag'))

router.use('/options', require('./option'))

router.post('/upload', require('../controller/upload.controller').uploadFiles)

module.exports = router
