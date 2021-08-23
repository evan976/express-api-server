/**
 * Article controller module
 * @file 文章控制器
 * @module controller/article
 */

exports.getArticleLists = async (req, res, next) => {
  try {
    // TODO 获取文章列表
    res.send('getArticleLists')
  } catch (error) {
    next(error)
  }
}

exports.getArticleListsBySpecifiedUser = async (req, res, next) => {
  try {
    // TODO 获取指定用户文章列表
    res.send('getArticleFeeds')
  } catch (error) {
    next(error)
  }
}

exports.getArticle = async (req, res, next) => {
  try {
    // TODO 获取单个文章
    res.send('getArticle')
  } catch (error) {
    next(error)
  }
}

exports.createArticle = async (req, res, next) => {
  try {
    // TODO 新建文章
    res.send('createArticle')
  } catch (error) {
    next(error)
  }
}

exports.updateArticle = async (req, res, next) => {
  try {
    // TODO 修改文章
    res.send('updateArticle')
  } catch (error) {
    next(error)
  }
}

exports.removeArticle = async (req, res, next) => {
  try {
    // TODO 删除文章
    res.send('removeArticle')
  } catch (error) {
    next(error)
  }
}

exports.addComments = async (req, res, next) => {
  try {
    // TODO 添加评论
    res.send('addComments')
  } catch (error) {
    next(error)
  }
}

exports.getComments = async (req, res, next) => {
  try {
    // TODO 获取评论
    res.send('getComments')
  } catch (error) {
    next(error)
  }
}

exports.removeComment = async (req, res, next) => {
  try {
    // TODO 删除评论
    res.send('removeComment')
  } catch (error) {
    next(error)
  }
}

exports.favoriteArticle = async (req, res, next) => {
  try {
    // TODO 喜欢文章
    res.send('favoriteArticle')
  } catch (error) {
    next(error)
  }
}
