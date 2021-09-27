/**
 * @module 标签模型
 */

const { mongoose } = require('../core/mongodb')
const autoIncrement = require('mongoose-auto-increment')

const tagSchema = new mongoose.Schema({

  // 名称
  name: {
    type: String,
    required: true
  },

  // 别名
  slug: {
    type: String
  },

  // 描述
  description: {
    type: String
  },

  // 创建时间
  created_at: {
    type: Date,
    default: Date.now
  },

  // 最后修改时间
  updated_at: {
    type: Date
  }
})

tagSchema.plugin(autoIncrement.plugin, {
  model: 'Tag',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

tagSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { updated_at: Date.now() })
  next()
})

module.exports = mongoose.model('Tag', tagSchema)
