const crypto = require('crypto')

const md5Decode = password => {
  return crypto.createHash('md5').update(password).digest('hex')
}

module.exports = md5Decode
