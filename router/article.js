const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

router.get('/', require('../controller/article.controller').find)

router.get('/detail/:id', require('../controller/article.controller').findOne)

router.post('/', auth, require('../controller/article.controller').create)

router.put('/', auth, require('../controller/article.controller').update)

router.delete('/', auth, require('../controller/article.controller').remove)

module.exports = router
