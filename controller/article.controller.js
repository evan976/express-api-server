/**
 * @module 文章控制器
 */

const Article = require('../model/article.model')
const Category = require('../model/category.model')
const Tag = require('../model/tag.model')

const { SORT_TYPE, PUBLISH_STATE } = require('../core/constant')
const {
  handleSuccess,
  handleError,
  handlePaginationResult
} = require('../core/handle-request')
class ArticleController {

  findAll (req, res) {

    // 初始参数
    const { keyword, category, category_slug, tags, tags_slug } = req.query

    const offset = Number(req.query.offset) || 1

    // 过滤条件
    const options = {
      offset,
      populate: ['category', 'tags'],
      select: '-content',
      // sort: { _id: SORT_TYPE.desc }
    }

    const query = {}

    if (category) {
      query.category = category
    }

    if (tags) {
      query.tags = tags
    }

    if (keyword) {
      const keywordReg = new RegExp(keyword)
      query.$or = [
        { 'title': keywordReg },
        { 'description': keywordReg },
        { 'content': keywordReg }
      ]
    }

    // 查询文章
    const getArticles = () => {
      // Article.find(query)
      Article.aggregatePaginate(query, options)
        .then(articles => {
          console.log(articles)
          handleSuccess({
            res,
            message: '文章列表获取成功',
            result: handlePaginationResult(articles)
          })
        })
        .catch(err => handleError({ res, message: '文章列表获取失败', err }))
    }

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

  update ({ params: { article_id }, body: article, body: { title, content, category } }, res) {
    if (!title || !content) return handleError({ res, message: '文章标题或内容不能为空' })
    if (!category) return handleError({ res, message: '请选择一个分类' })
    Article.findByIdAndUpdate(article_id, article, { new: true })
      .populate('category tags')
      .then(result => handleSuccess({ res, message: '文章更新成功', result }))
      .catch(err => handleError({ res, message: '文章更新失败', err }))
  }

  remove ({ params: { article_id } }, res) {
    Article.findByIdAndRemove(article_id)
      .then(() => handleSuccess({ res, message: '文章删除成功' }))
      .catch(err => handleError({ res, message: '文章删除失败', err }))
  }
}

module.exports = new ArticleController()
