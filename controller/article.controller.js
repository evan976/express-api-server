/**
 * @module 文章控制器
 */

const Article = require('../model/article.model')
const HandleResponse = require('../core/response-handler')
const { SORT_TYPE } = require('../core/constant')
class ArticleController {

  findAll ({ query: { limit = 15, offset = 1, state = 1 } }, res) {

    if (offset < 1) {
      offset = 1
    }

    Article.find({ state }, 'title description thumb updated_at category tags meta')
      .skip((parseInt(offset) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ _id: SORT_TYPE.desc })
      .populate('category', 'name')
      .populate('tags', 'name')
      .then(articleList => {
        articleList.length
         ? res.json({ code: 1, message: '获取文章列表成功', data: { articleList, pagination: { limit, offset } } })
         : new HandleResponse('空空如也～').fail(res)
      })
      .catch(err => {
        new HandleResponse('获取文章列表失败').fail(res)
      })
  }

  findOne ({ params: { article_id } }, res) {
    Article.findById(article_id)
      .populate('category', 'name')
      .populate('tags', 'name')
      .then(result => {
        if (result) {
          // 每请求一次文章详情，浏览数量 +1
          result.meta.views++
          result.save()
          new HandleResponse({ result }, '获取文章详情成功').success(res)
        } else {
          new HandleResponse('文章资源不存在').fail(res)
        }
      })
      .catch(err => {
        new HandleResponse('获取文章详情失败').fail(res)
      })
  }

  create ({ body: article, body: { title, content, category } }, res) {

    if (!title || !content) {
      return new HandleResponse('文章标题或内容不能为空').fail(res)
    }

    if (!category) {
      return new HandleResponse('请选择至少一个分类').fail(res)
    }

    Article.find({ title })
      .then(result => {
        result.length
          ? new HandleResponse('文章标题不能重复').fail(res)
          : saveArticle()
      })
      .catch(err => {
        new HandleResponse('文章发布失败').fail(res)
      })

    const saveArticle = () => {
      new Article(article).save()
        .then(result => {
          new HandleResponse({ result }, '文章发布成功').success(res)
        })
        .catch(err => {
          new HandleResponse('文章发布失败').fail(res)
        })
    }
  }

  update ({ params: { article_id }, body: article, body: { title, content, category } }, res) {

    if (!title || !content) {
      return new HandleResponse('文章标题和内容不能为空').fail(res)
    }

    if (!category) {
      return new HandleResponse('请选择至少一个分类').fail(res)
    }

    Article.find({ title })
      .then(articles => {
        articles.length
          ? new HandleResponse('文章标题不能重复').fail(res)
          : updateArticle()
      })
      .catch(err => {
        new HandleResponse('失败').fail(res)
      })

    const updateArticle = () => {
      Article.findByIdAndUpdate(article_id, article, { new: true })
        .populate('category', 'name')
        .populate('tags', 'name')
        .then(result => {
          result
            ? new HandleResponse({ result }, '文章更新成功').success(res)
            : new HandleResponse('没有这篇文章啊～').fail(res)
        })
        .catch(err => {
          new HandleResponse('文章更新失败').fail(res)
        })
    }
  }

  remove ({ params: { article_id } }, res) {

    Article.findByIdAndRemove(article_id)
      .then(() => {
        new HandleResponse('文章删除成功').success(res)
      })
      .catch(err => {
        new HandleResponse('文章删除失败').fail(res)
      })
  }
}

module.exports = new ArticleController()
