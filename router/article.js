/**
 * @module 文章路由
 */

const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

router.get('/', require('../controller/article.controller').findAll)

router.get('/:article_id', require('../controller/article.controller').findOne)

router.post('/', auth, require('../controller/article.controller').create)

router.put('/:article_id', auth, require('../controller/article.controller').update)

router.delete('/:article_id', auth, require('../controller/article.controller').remove)

module.exports = router
