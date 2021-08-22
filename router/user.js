/**
 * User router module
 * @file 用户路由模块
 * @module router/user
 */

const express = require('express')
const userCtrl = require('../controller/user.controller')
const userValidator = require('../validator/user.validator')

const router = express.Router()

// login
router.post('/users/login', userValidator.login, userCtrl.login)

// register
router.post('/users/register', userValidator.register, userCtrl.register)

// get current user
router.get('/user', userCtrl.getCurrentUser)

// update user
router.put('/user', userCtrl.updateCurrentUser)

module.exports = router
