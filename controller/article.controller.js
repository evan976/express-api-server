const Article = require('../model/article.model')
const HandleResponse = require('../core/response-handler')
class ArticleController {

  async find (req, res, next) {}

  async findOne (req, res, next) {}

  async create ({ body: article }, res) {
    if (!article.title || !article.content) {
      return new HandleResponse('标题或内容不能为空').fail(res)
    }

    try {
      const [_article] = await new Article(article).save()
      _article
       ? new HandleResponse({ article }, '文章发布成功').success(res)
       : new HandleResponse('文章发布失败').fail(res)
    } catch (error) {
      return new HandleResponse('文章发布失败').fail(res)
    }
  }

  async update (req, res, next) {}

  async remove (req, res, next) {}
}

module.exports = new ArticleController()
