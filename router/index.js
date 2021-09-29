/**
 * @module 路由统一出口
 */

const express = require('express')
const { INFO } = require('../config/config.default')

const router = express.Router()

router.get('/', (req, res) => {
  res.jsonp(INFO)
})

router.use(require('./user'))

router.use('/articles', require('./article'))

router.use('/categories', require('./category'))

router.use('/tags', require('./tag'))

router.use('/options', require('./option'))

router.use('/images', require('./image'))

module.exports = router
