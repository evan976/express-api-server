/**
 * Tag Controller module
 * @file 标签控制器
 * @module controller/tag
 */

exports.getTagLists = async (req, res, next) => {
  try {
    // TODO 获取全部标签
    res.send('getTagLists')
  } catch (error) {
    next(error)
  }
}