import { Context } from 'egg'
import BaseService from './base'

export default class CategoryService extends BaseService {
  constructor(app: Context) {
    super('Category', app)
  }

  async find(query: any) {
    const { ctx } = this
    const [page, pageSize] = [query.page || 1, query.pageSize || 10].map(v =>
      Number(v)
    )

    try {
      let data = await ctx.model.Category.find({}, '-__v -_id')
        .sort({ _id: -1 })
        .limit(pageSize)
        .skip((page - 1) * pageSize)

      const total = await ctx.model.Category.countDocuments(query)

      // 聚合查询每个分类下对应的文章数量
      const result = await ctx.model.Article.aggregate([
        { $unwind: '$category' },
        {
          $group: {
            _id: '$category',
            num_tutorial: { $sum: 1 }
          }
        }
      ])

      // 深拷贝
      data = JSON.parse(JSON.stringify(data))

      // 遍历每个分类，加 count 字段
      data = data.map(category => {
        const finded = result.find(v => String(v._id) === String(category._id))
        category.count = finded ? finded.num_tutorial : 0
        return category
      })

      return {
        total,
        pages: Math.ceil(total / pageSize),
        data
      }
    } catch (error) {
      return ctx.helper.error({ ctx, message: error })
    }
  }
}
