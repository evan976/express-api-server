const express = require('express')
const User = require('../model/user.model')
const userCtrl = require('../controller/user.controller')
const { body, validationResult } = require('express-validator')

const router = express.Router()

// login
router.post('/users/login', userCtrl.login)

// register
router.post('/users/register', [
  body('user.username')
    .notEmpty().withMessage('用户名不能为空')
    .custom(async username => {
      const user = await User.findOne({ username })
      if (user) {
        return Promise.reject('用户已存在')
      }
    }),

  body('user.password').notEmpty().withMessage('密码不能为空'),

  body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式错误')
    .bail()
    .custom(async email => {
      const user = await User.findOne({ email })
      if (user) {
        return Promise.reject('邮箱已存在')
      }
    }),
], (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}, userCtrl.register)

// get current user
router.get('/user', userCtrl.getCurrentUser)

// update user
router.put('/user', userCtrl.updateCurrentUser)

module.exports = router