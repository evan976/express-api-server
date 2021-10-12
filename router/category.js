/**
 * @module 分类路由
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
} = require('../controller/category.controller')

router.get('/', findAll)

router.get('/:category_id', findOne)

router.post('/', auth, create)

router.put('/:category_id', auth, update)

router.delete('/:category_id', auth, remove)

module.exports = router
