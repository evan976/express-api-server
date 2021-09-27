/**
 * @module 用户路由
 */

const express = require('express')
const auth = require('../utils/auth')

const router = express.Router()

router.post('/login', require('../controller/user.controller').login)

router.get('/users', auth, require('../controller/user.controller').find)

router.put('/users', auth, require('../controller/user.controller').update)

module.exports = router
