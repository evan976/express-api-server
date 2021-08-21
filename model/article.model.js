/**
 * Article model module
 * @file 文章数据模型
 * @module model/user
 */

const { mongoose } = require('../config/mongodb')
const baseModel = require('./base.model')

const articleSchema = new mongoose.Schema({

  title: { type: String, required: true },

  slug: { type: String, default: '' },

  description: { type: String, default: '' },

  content: { type: String, default: '' },

  ...baseModel
})

module.exports = mongoose.model('Article', articleSchema)
