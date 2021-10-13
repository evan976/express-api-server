/**
 * @module 权限验证
 */

const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const { handleError } = require('../core/handle-request')
const { JWTSECRET } = require('../config/config.default')

const auth = async (req, res, next) => {

  if (!req.headers || !req.headers.authorization) {
    return handleError({ res, message: 'token 无效，暂无权限！' })
  }

  let token = req.headers.authorization.split(' ')
	if (token.length === 2 && token[0] === 'Bearer') {
		token = token[1]
	} else {
    return handleError({ res, message: 'token 格式不正确！' })
  }

  try {
    const { data } = jwt.verify(token, JWTSECRET)
    const user = await User.findById(data)
    if (!user) {
      return handleError({ res, message: 'token错误' })
    }
    req.user_id = data
    next()
  } catch (err) {
    return handleError({ res, message: 'token 错误或过期，请重新登录！' })
  }
}

module.exports = auth
