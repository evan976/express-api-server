/**
 * @module 响应数据处理
 */

const { STATUS_CODE } = require('./constant')

class HandleResponse {
  constructor (data, message = '成功', options) {
    this.data = null
    if (arguments.length === 0) {
      this.message = '成功'
    } else if (arguments.length === 1) {
      this.message = data
    } else {
      this.data = data
      this.message = message
      options && (this.options = options)
    }
  }

  json (res) {
    return res.json(this.createResponse())
  }

  createResponse () {
    if (!this.code) {
      this.code = STATUS_CODE.error
    }
    let base = {
      code: this.code,
      message: this.message
    }
    if (this.data) {
      base.data = this.data
    }
    if (this.options) {
      base = { ...base, ...this.options }
    }
    return base
  }

  success (res) {
    this.code = STATUS_CODE.success
    this.json(res)
  }

  fail (res) {
    this.code = STATUS_CODE.error
    this.json(res)
  }
}

module.exports = HandleResponse
