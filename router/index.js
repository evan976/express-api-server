/**
 * @module 路由统一出口
 */

const express = require('express')
const { INFO } = require('../config/config.default')

const router = express.Router()

router.get('/', (req, res) => {
  res.json(INFO)
})

router.use(require('./user'))

router.use('/articles', require('./article'))

router.use('/categories', require('./category'))

router.use('/tags', require('./tag'))

router.use('/options', require('./option'))

router.use('/qiniu', require('./qiniu'))

router.use('*', (req, res) => {
  res.status(404).json({
    code: 1,
    message: '无效的 API 请求'
  })
})

module.exports = router
