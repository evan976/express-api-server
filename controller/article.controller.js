/**
 * @module 文章控制器
 */

const jwt = require('jsonwebtoken')
const Article = require('../model/article.model')
const Category = require('../model/category.model')
const Tag = require('../model/tag.model')

const config = require('../config/config.default')
const { SORT_TYPE, PUBLISH_STATE } = require('../core/constant')
const {
  handleSuccess,
  handleError,
  handlePaginationResult
} = require('../core/handle-request')
class ArticleController {

  // 获取文章列表
  async findAll (req, res) {

    // 初始参数
    const { keyword, category, category_slug, tags, tags_slug } = req.query

    const [offset, limit] = [req.query.offset || 1, req.query.limit || 10].map(v => Number(v))

    const isBackRequset = req.headers.authorization || null

    // 总文章数
    let total = await Article.countDocuments({})

    // 前台获取状态为已发布的所有文章
    if (!isBackRequset) {
      total = await Article.countDocuments({ state: PUBLISH_STATE.published })
    }

    // 查询参数
    const query = {}

    // 分类查询
    if (category) {
      query.category = category
    }

    // 标签查询
    if (tags) {
      query.tags = tags
    }

    // 关键词模糊查询
    if (keyword) {
      const keywordReg = new RegExp(keyword)
      query.$or = [
        { 'title': keywordReg },
        { 'description': keywordReg },
        { 'content': keywordReg }
      ]
    }

    /**
     * 判断是前台请求还是后台请求：
     * 前台请求过滤掉状态为草稿的文章
     * 后台请求查询出所有文章
     */

    if (!isBackRequset) {
      query.state = PUBLISH_STATE.published
    }

    // 查询文章列表
    const getArticles = () => {
      Article.find(query, '-content').sort({ _id: SORT_TYPE.desc }).limit(limit)
      .skip((offset - 1) * limit)
      .populate('category tags')
      .then(articles => {
        handleSuccess({
          res,
          message: '文章列表获取成功',
          result: handlePaginationResult(limit, offset, total, articles)
        })
      })
      .catch(err => handleError({ res, message: '文章列表获取失败', err }))
    }

    // 分类别名查询
    if (category_slug) {
      return Category.find({ slug: category_slug })
        .then(([category] = []) => {
          if (category) {
            query.category = category._id
            getArticles()
          } else {
            handleError({ res, message: '当前分类不存在' })
          }
        })
        .catch(err => handleError({ res, message: '分类查找失败', err }))
    }

    // 标签别名查询
    if (tags_slug) {
      return Tag.find({ slug: tags_slug })
        .then(([tag] = []) => {
          if (tag) {
            query.tags = tag._id
            getArticles()
          } else {
            handleError({ res, message: '当前标签不存在' })
          }
        })
        .catch(err => handleError({ res, message: '标签查找失败', err }))
    }

    getArticles()
  }

  // 获取文章详情
  findOne ({ params: { article_id } }, res) {

    // 判断是前台请求还是后台请求
    const isFindById = isNaN(Number(article_id))

    // 后台请求，不需要关联查询出分类和标签
    if (isFindById) {
      Article.findById(article_id)
        .then(result => handleSuccess({ res, message: '文章详情获取成功', result }))
        .catch(err => handleError({ res, message: '文章详情获取失败', err }))
    } else {
      article_id = Number(article_id)
      // 前台请求，关联查询出 category tags
      Article.findOne({ id: article_id, state: PUBLISH_STATE.published })
        .populate('category', 'name slug')
        .populate('tags', 'name slug')
        .then(result => {
          // 前台每请求一次，浏览数量 +1
          result.meta.views++
          result.save()
          handleSuccess({ res, message: '文章详情获取成功', result })
        })
        .catch(err => handleError({ res, message: '文章详情获取失败', err }))
    }
  }

  // 新增文章
  create ({ body: article, body: { title, content, category } }, res) {

    if (!title || !content) return handleError({ res, message: '文章标题或内容不能为空' })

    if (!category) return handleError({ res, message: '请选择一个分类' })

    Article.find({ title })
      .then(result => {
        result.length
          ? handleError({ res, message: '文章标题不能重复' })
          : saveArticle()
      })
      .catch(err => handleError({ res, message: '文章发布失败', err }))

    const saveArticle = () => {
      new Article(article).save()
        .then(result => handleSuccess({ res, message: '文章发布成功', result }))
        .catch(err => handleError({ res, message: '文章发布失败', err }))
    }
  }

  // 修改单个文章
  update ({ params: { article_id }, body: article, body: { title, content, category } }, res) {
    if (!title || !content) return handleError({ res, message: '文章标题或内容不能为空' })
    if (!category) return handleError({ res, message: '请选择一个分类' })
    Article.findByIdAndUpdate(article_id, article, { new: true })
      .populate('category tags')
      .then(result => handleSuccess({ res, message: '文章更新成功', result }))
      .catch(err => handleError({ res, message: '文章更新失败', err }))
  }

  // 删除单个文章
  remove ({ params: { article_id } }, res) {
    Article.findByIdAndRemove(article_id)
      .then(() => handleSuccess({ res, message: '文章删除成功' }))
      .catch(err => handleError({ res, message: '文章删除失败', err }))
  }
}

module.exports = new ArticleController()
