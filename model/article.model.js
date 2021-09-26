const { mongoose } = require('../core/mongodb')
const autoIncrement = require('mongoose-auto-increment')
const { PUBLISH_STATE, ORIGIN_TYPE } = require('../core/constant')

const articleSchema = new mongoose.Schema({


  // 标题
  title: {
    type: String,
    required: true
  },

  // 描述
  description: {
    type: String
  },

  // 关键词
  keywords: [{
    type: String
  }],

  // 缩略图
  thumb: {
    type: String
  },

  // 内容
  content: {
    type: String,
    required: true
  },

  // 发布状态 0 => 草稿 1 => 发布
  state: {
    type: Number,
    default: PUBLISH_STATE.published
  },

  // 原创 0 => 原创 1 => 转载
  origin: {
    type: Number,
    default: ORIGIN_TYPE.original
  },

  // 分类
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },

  // 标签
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],

  // 元信息
  meta: {
    views: { type: Number, default: 0 },  // 浏览数量
    comments: { type: Number, default: 0 }  // 评论数量
  },

  // 发布时间
  created_at: {
    type: Date,
    default: Date.now
  },

  // 最后修改时间
  updated_at: {
    type: Date
  }

})

articleSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

articleSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { updated_at: Date.now() })
  next()
})

module.exports = mongoose.model('Article', articleSchema)
