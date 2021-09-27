const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

router.get('/', require('../controller/category.controller').findAll)

router.get('/:category_id', require('../controller/category.controller').findOne)

router.post('/', auth, require('../controller/category.controller').create)

router.put('/:category_id', auth, require('../controller/category.controller').update)

router.delete('/:category_id', auth, require('../controller/category.controller').remove)

module.exports = router
