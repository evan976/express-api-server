/**
 * @module 权限验证
 */

const { verify } = require('./jwt')
const HandleResponse = require('../core/response-handler')

const auth = (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return new HandleResponse('token无效！').fail(res)
  }
  const token = req.headers.authorization.split(' ').pop()
  const tokenData = verify(token)
  if (tokenData.token) {
    res.userId = tokenData.userId
    next()
  } else {
    new HandleResponse('token错误或过期，请重新登录！').fail(res)
  }
}

module.exports = auth
