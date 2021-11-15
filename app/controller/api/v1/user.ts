import { Context } from 'egg'
import BaseController from './base'

export default class UserController extends BaseController {
  constructor(app: Context) {
    super('user', app)
  }

  async update() {
    const { ctx } = this
    await ctx.service.user.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  }
}
