/**
 * Tag Router module
 * @file 标签路由模块
 * @module router/tag
 */

const express = require('express')
const tagCtrl = require('../controller/tag.controller')

const router = express.Router()

router.get('/', tagCtrl.getTagLists)

module.exports = router
