/**
 * Profile router module
 * @file 个人信息路由模块
 * @module router/profile
 */

const express = require('express')
const profileCtrl = require('../controller/profile.controller')

const router = express.Router()

// get profile
router.get('/:username', profileCtrl.getProfile)

// follow user
router.post('/:username/follow', profileCtrl.followUser)

// unfollow user
router.delete('/:username/follow', profileCtrl.unfollowUser)

module.exports = router