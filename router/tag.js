const express = require('express')
const router = express.Router()

router.get('/', require('../controller/tag.controller').find)

router.get('/detail', require('../controller/tag.controller').findOne)

router.post('/', require('../controller/tag.controller').create)

router.put('/', require('../controller/tag.controller').update)

router.delete('/', require('../controller/tag.controller').remove)

module.exports = router
