import { Context, Controller } from 'egg'

export default class BaseController extends Controller {
  private serviceName: string

  constructor(serviceName: string, app: Context) {
    super(app)
    this.serviceName = serviceName
  }
  async index() {
    const { ctx } = this
    const { query } = ctx
    const data = await ctx.service[this.serviceName].find(query)
    ctx.helper.success({ ctx, data })
  }

  async show() {
    const { ctx } = this
    const data = await ctx.service[this.serviceName].findById(ctx.params.id)
    ctx.helper.success({ ctx, data })
  }

  async create() {
    const { ctx } = this
    const data = await ctx.service[this.serviceName].save(ctx.request.body)
    ctx.helper.success({ ctx, data })
  }

  async update() {
    const { ctx } = this
    const data = await ctx.service[this.serviceName].findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    )
    ctx.helper.success({ ctx, data })
  }

  async destroy() {
    const { ctx } = this
    const data = await ctx.service[this.serviceName].findByIdAndRemove(
      ctx.params.id
    )
    ctx.helper.success({ ctx, data })
  }

  async destroyMany() {
    const { ctx } = this
    const data = await ctx.service[this.serviceName].findByIdAndRemoveMany(
      ctx.query.ids.split(',')
    )
    ctx.helper.success({ ctx, data })
  }
}
