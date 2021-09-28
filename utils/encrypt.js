/**
 * @module 密码编码
 */

const crypto = require('crypto')
const { Base64 } = require('js-base64')

const md5Decode = password => {
  return crypto.createHash('md5').update(password).digest('hex')
}

const decodePassword = pwd => pwd ? Base64.decode(pwd) : pwd

module.exports = {
  md5Decode,
  decodePassword
}
