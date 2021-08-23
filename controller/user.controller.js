/**
 * User Controller module
 * @file 用户控制器
 * @module controller/user
 */

const User = require('../model/user.model')
const jwt = require('../utils/jwt')
const config = require('../config/config.default')

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne(req.body.user)
    const token = await jwt.sign({
      userId: user._id
    }, config.app.jwtSecret)
    res.status(200).json({
      code: 1,
      message: '登录成功',
      token
    })
  } catch (error) {
    next(error)
  }
}

exports.register = async (req, res, next) => {
  try {
    // TODO 用户注册
    const user = new User(req.body.user)
    await user.save()
    res.status(201).json({
      code: 1,
      message: '注册用户成功'
    })
  } catch (error) {
    next(error)
  }
}

exports.getCurrentUser = async (req, res, next) => {
  try {
    // TODO 获取当前登录用户
    res.status(200).json({
      code: 1,
      message: '获取当前登录用户成功'
    })
  } catch (error) {
    next(error)
  }
}

exports.updateCurrentUser = async (req, res, next) => {
  try {
    // TODO 更新当前登录用户
    res.status(200).json({
      code: 1,
      message: '用户资料更新成功'
    })
  } catch (error) {
    next(error)
  }
}
