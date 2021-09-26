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

router.use('/article', require('./article'))

router.use('/category', require('./category'))

router.use('/tag', require('./tag'))

module.exports = router
