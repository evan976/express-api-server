/**
 * User model module
 * @file 用户数据模型
 * @module model/user
 */

const { mongoose } = require('../config/mongodb')

const userSchema = new mongoose.Schema({
  
  username: { type: String, required: true },

  email: { type: String, required: true },

  password: { type: String, required: true },

  slogan: { type: String, default: '' },

  gravatar: { type: String, default: '' }
})

module.exports = mongoose.model('User', userSchema)