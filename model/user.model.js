/**
 * @module 用户模型
 */

const { mongoose } = require('../core/mongodb')
const autoIncrement = require('mongoose-auto-increment')

const userSchema = new mongoose.Schema({

  // 用户名
  username: {
    type: String,
    required: true
  },

  // 邮箱
  email: {
    type: String
  },

  // 密码（base64编码 + md5编码）
  password: {
    type: String,
    required: true
  },

  // 简介
  slogan: {
    type: String,
    default: ''
  },

  // 头像
  gravatar: {
    type: String,
    default: ''
  },

  // 创建时间
  created_at: {
    type: Date,
    default: Date.now
  },

  // 最后更新时间
  updated_at: {
    type: Date
  }
})

userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

userSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { updated_at: Date.now() })
  next()
})

module.exports = mongoose.model('User', userSchema)
