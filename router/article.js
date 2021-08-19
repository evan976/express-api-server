const express = require('express')

const router = express.Router()

// list articles
router.get('/', async (req, res, next) => {
  try {
    // TODO 获取文章列表
    res.send('get /articles')
  } catch (error) {
    next(error)
  }
})

// feed articles
router.get('/feed', async (req, res, next) => {
  try {
    // TODO 获取文章列表
    res.send('get /articles/feed')
  } catch (error) {
    next(error)
  }
})

// // get article
router.get('/:slug', async (req, res, next) => {
  try {
    // TODO 获取单个文章
    res.send('get /articles/:slug')
  } catch (error) {
    next(error)
  }
})


// create article
router.post('/', async (req, res, next) => {
  try {
    // TODO 新建文章
    res.send('get /articles')
  } catch (error) {
    next(error)
  }
})

// update article
router.put('/:slug', async (req, res, next) => {
  try {
    // TODO 修改文章
    res.send('get /articles/:slug')
  } catch (error) {
    next(error)
  }
})

// delete article
router.delete('/:slug', async (req, res, next) => {
  try {
    // TODO 删除文章
    res.send('get /articles/:slug')
  } catch (error) {
    next(error)
  }
})

// add comments to an article
router.post('/:slug/comments', async (req, res, next) => {
  try {
    // TODO 添加评论
    res.send('get /articles/:slug/comments')
  } catch (error) {
    next(error)
  }
})

// get comments from an article
router.get('/:slug/comments', async (req, res, next) => {
  try {
    // TODO 获取评论
    res.send('get /articles/:slug/comments')
  } catch (error) {
    next(error)
  }
})

router.delete('/:slug/comments/:id', async (req, res, next) => {
  try {
    // TODO 删除评论
    res.send('get /articles/:slug/comments/:id')
  } catch (error) {
    next(error)
  }
})

router.post('/:slug/favorite', async (req, res, next) => {
  try {
    // TODO 喜欢文章
    res.send('get /articles/:slug/favorite')
  } catch (error) {
    next(error)
  }
})

module.exports = router