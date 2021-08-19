const express = require('express')
const userCtrl = require('../controller/user.controller')

const router = express.Router()

// login
router.post('/users/login', userCtrl.login)

// register
router.post('/users/register', userCtrl.register)

// get current user
router.get('/user', userCtrl.getCurrentUser)

// update user
router.put('/user', userCtrl.updateCurrentUser)

module.exports = router