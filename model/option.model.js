const { mongoose } = require('../core/mongodb')

const optionSchema = new mongoose.Schema({

  // 网站标题
  title: {
    type: String,
    required: true
  },

  // 网站副标题
  sub_title: {
    type: String,
    required: true
  },

  // 关键字
  keywords: [{
    type: String
  }],

  // 描述
  description: {
    type: String
  },

  // 站点地址
  site_url: {
    type: String
  },

  // 备案号
  site_icp: {
    type: String
  }
})

module.exports = mongoose.model('Option', optionSchema)
