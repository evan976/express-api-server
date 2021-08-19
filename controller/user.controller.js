/**
 * User Controller module
 * @file 用户控制器模块
 * @module controller/user 
 */

const User = require('../model/user.model')

exports.login = async (req, res, next) => {
  try {
    // TODO 用户登录
    res.send('post /users/login')
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
      user
    })
  } catch (error) {
    next(error)
  }
}

exports.getCurrentUser = async (req, res, next) => {
  try {
    // TODO 获取当前登录用户
    res.send('get /user')
  } catch (error) {
    next(error)
  }
}

exports.updateCurrentUser = async (req, res, next) => {
  try {
    // TODO 更新当前登录用户
    res.send('put /user')
  } catch (error) {
    next(error)
  }
}