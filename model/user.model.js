/**
 * @module 用户模型
 */

const { mongoose } = require('../core/mongodb')
const autoIncrement = require('mongoose-auto-increment')

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },

  email: {
    type: String
  },

  password: {
    type: String,
    required: true
  },

  slogan: {
    type: String,
    default: ''
  },

  gravatar: {
    type: String,
    default: ''
  },

  created_at: {
    type: Date,
    default: Date.now
  },

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
