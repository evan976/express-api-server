/**
 * Error handler
 * @file 错误处理中间件
 * @module middleware/error-handler
 *
 */

const util = require('util')

module.exports = () => {
  return (err, req, res, next) => {
    res.status(500).json({
      error: util.format(err)
    })
  }
}
