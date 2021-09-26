/**
 * @module jsonwebtoken
 */

const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/config.default')

const sign = data => {
  return jwt.sign({
    data
  }, jwtSecret, { expiresIn: 60 * 60 * 24 * 7 })
}

const verify = token => {
  try {
    const data = jwt.verify(token, jwtSecret)
    return { userId: data.data, token: true }
  } catch (err) {
    return { userId: null, token: false }
  }
}

module.exports = {
  sign,
  verify
}
