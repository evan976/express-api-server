/**
 * @module 用户路由模块
 */

const express = require('express')
const auth = require('../utils/auth')

const router = express.Router()

router.post('/login', require('../controller/user.controller').login)

router.get('/user', auth, require('../controller/user.controller').find)

router.put('/user', auth, require('../controller/user.controller').update)

module.exports = router
