import { Context } from 'egg'
import BaseController from './base'

export default class OptionController extends BaseController {
  constructor(app: Context) {
    super('option', app)
  }

  async index() {
    const { ctx } = this
    const data = await ctx.service.option.find()
    ctx.helper.success({ ctx, data })
  }
}
