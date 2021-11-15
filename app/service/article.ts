import { Context } from 'egg'
import BaseService from './base'

export default class ArticleService extends BaseService {
  constructor(app: Context) {
    super('Article', app)
  }

  async find(query: any) {
    const { ctx } = this

    const [page, pageSize, state] = [
      query['page'] || 1,
      query['pageSize'] || 10,
      query['state'] || 1
    ].map(v => Number(v))

    const queryString = {}

    if (query['category']) {
      queryString['category'] = query['category']
    }

    if (query['tag']) {
      queryString['tag'] = query['tag']
    }

    if (query['hot']) {
      queryString['isHot'] = query['hot']
    }

    // 默认查询 state = 1 的数据，如需获取全部数据，state = 0
    if (state) {
      queryString['state'] = state
    }

    if (query['keyword']) {
      const keywordReg = new RegExp(query['keyword'])
      queryString['$or'] = [
        { title: keywordReg },
        { description: keywordReg },
        { content: keywordReg }
      ]
    }

    try {
      const data = await ctx.model.Article.find(
        queryString,
        '-content -__v -_id'
      )
        .sort({ _id: -1 })
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .populate('category', '-_id id name slug')
        .populate('tags', '-_id id name slug')

      const total = await ctx.model.Article.countDocuments(queryString)

      return {
        total,
        pages: Math.ceil(total / pageSize),
        data
      }
    } catch (error) {
      return ctx.helper.error({ ctx })
    }
  }

  async findById(id: string) {
    const { ctx } = this
    // 判断是前台请求还是后台请求
    const isFindById = isNaN(Number(id))

    try {
      // 后台请求，不需要关联查询出分类和标签
      if (isFindById) {
        const data = await ctx.model.Article.findById(id)
        return data
      } else {
        // 前台请求，关联查询出 category tags
        const aid = Number(id)
        const data = await ctx.model.Article.findOne({ id: aid, state: 1 })
          .populate('category', 'id name slug')
          .populate('tags', 'id name slug')

        // 每请求一次，浏览数 +1
        data.meta.views++
        data.save()
        return data
      }
    } catch (error) {
      return ctx.helper.error({ ctx, message: error })
    }
  }
}
