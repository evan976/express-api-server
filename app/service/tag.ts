import { Context } from 'egg'
import BaseService from './base'

export default class TagService extends BaseService {
  constructor(app: Context) {
    super('Tag', app)
  }

  async find(query: any) {
    const { ctx } = this
    const [page, pageSize] = [query.page || 1, query.pageSize || 10].map(v =>
      Number(v)
    )

    try {
      let data = await ctx.model.Tag.find({}, '-__v -_id')
        .sort({ _id: -1 })
        .limit(pageSize)
        .skip((page - 1) * pageSize)

      const total = await ctx.model.Tag.countDocuments(query)

      // 聚合查询
      const result = await ctx.model.Article.aggregate([
        { $unwind: '$tags' },
        {
          $group: {
            _id: '$tags',
            num_tutorial: { $sum: 1 }
          }
        }
      ])

      data = JSON.parse(JSON.stringify(data))

      data = data.map(tag => {
        const finded = result.find(v => String(v._id) === String(tag._id))
        tag.count = finded ? finded.num_tutorial : 0
        return tag
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
