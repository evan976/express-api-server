/**
 * Category Controller module
 * @file 分类控制器
 * @module controller/category
 */

exports.getCategoryLists = async (req, res, next) => {
  try {
    // TODO 获取全部分类列表
    res.send('getCategoryLists')
  } catch (error) {
    next(error)
  }
}

exports.getCategory = async (req, res, next) => {
  try {
    // TODO 获取单个分类
    res.send('getCategory')
  } catch (error) {
    next(error)
  }
}

exports.createCategory = async (req, res, next) => {
  try {
    // TODO 创建分类
    res.send('createCategory')
  } catch (error) {
    next(error)
  }
}

exports.updateCategory = async (req, res, next) => {
  try {
    // TODO 修改分类
    res.send('updateCategory')
  } catch (error) {
    next(error)
  }
}

exports.removeCategory = async (req, res, next) => {
  try {
    // TODO 删除分类
    res.send('removeCategory')
  } catch (error) {
    next(error)
  }
}
