const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

router.get('/', require('../controller/tag.controller').findAll)

router.get('/:tag_id', require('../controller/tag.controller').findOne)

router.post('/', auth, require('../controller/tag.controller').create)

router.put('/:tag_id', auth, require('../controller/tag.controller').update)

router.delete('/:tag_id', auth, require('../controller/tag.controller').remove)

module.exports = router
