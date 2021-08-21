/**
 * API module
 * @file API 分发器
 * @module router/index
 */

const express = require('express')
const config = require('../config/config.default')

const router = express.Router()

// info
router.get('/', (req, res) => {
  res.jsonp(config.info)
})

// user
router.use(require('./user'))

// profile
router.use('/profiles', require('./profile'))

// article
router.use('/articles', require('./article'))

// tag
router.use('/tags', require('./tag'))

// category
router.use('/categories', require('./category'))

module.exports = router
