/**
 * @module 权限验证
 */

const jwt = require('jsonwebtoken')
// const User = require('../model/user.model')
const HandleResponse = require('../core/response-handler')
const { jwtSecret } = require('../config/config.default')

const auth = async (req, res, next) => {

  if (!req.headers || !req.headers.authorization) {
    return new HandleResponse('token无效，暂无权限！').fail(res)
  }
  const token = req.headers.authorization.split(' ').pop()

  try {
    const { data } = jwt.verify(token, jwtSecret)
    res.user_id = data
    next()
  } catch (error) {
    return new HandleResponse('token错误或过期，请重新登录！').fail(res)
  }
}

module.exports = auth
