/**
 * @module 文章路由
 */

const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')
const {
  findAll,
  findOne,
  create,
  update,
  remove
} = require('../controller/article.controller')

router.get('/', findAll)

router.get('/:article_id', findOne)

router.post('/', auth, create)

router.put('/:article_id', auth, update)

router.delete('/:article_id', auth, remove)

module.exports = router
