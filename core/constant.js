/**
 * @module 数据常量模块
 */

// 状态码
exports.STATUS_CODE = {
  success: 1,  // 成功
  error: -1  // 失败
}

// 文章状态
exports.PUBLISH_STATE = {
  draft: 0, // 草稿
  published: 1  // 已发布
}

// 文章类型
exports.ORIGIN_TYPE = {
  original: 0, // 原创
  reprint: 1  // 转载
}

// 排序类型
exports.SORT_TYPE = {
  asc: 1, // 升序
  desc: -1 // 降序
}
