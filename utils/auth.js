/**
 * @module 权限验证
 */

const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const HandleResponse = require('../core/response-handler')
const { jwtSecret } = require('../config/config.default')

const auth = async (req, res, next) => {

  if (!req.headers || !req.headers.authorization) {
    return new HandleResponse('token无效！').fail(res)
  }
  const token = req.headers.authorization.split(' ').pop()
  const { data } = jwt.verify(token, jwtSecret)

  if (!data) {
    return new HandleResponse('token错误或过期，请重新登录！').fail(res)
  }
  const { _id } = await User.findById(data, '_id')
  res.user_id = _id
  next()
}

module.exports = auth
