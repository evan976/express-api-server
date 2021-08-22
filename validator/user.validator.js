/**
 * User Validator module
 * @file 用户校验模块
 * @module validator/user
 */

const { body } = require('express-validator')
const validate = require('../middleware/validate')
const User = require('../model/user.model')
const md5 = require('../utils/md5')

exports.register = validate([
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
        return Promise.reject('该邮箱已被注册')
      }
    })
])

exports.login = [
  validate([
    body('user.email').notEmpty().withMessage('邮箱不能为空'),
    body('user.password').notEmpty().withMessage('密码不能为空')
  ]),
  validate([
    body('user.email').custom(async (email, { req }) => {
      const user = await User.findOne({ email }).select('password')
      if (!user) {
        return Promise.reject('用户不存在')
      }
      req.user = user
    })
  ]),
  validate([
    body('user.password').custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject('密码错误')
      }
    })
  ])
]
