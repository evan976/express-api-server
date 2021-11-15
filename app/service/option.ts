import { Context } from 'egg'
import BaseService from './base'

export default class OptionService extends BaseService {
  constructor(app: Context) {
    super('Option', app)
  }

  async find() {
    const { ctx } = this
    const [data] = await ctx.model.Option.find({}, '-_id -__v')
    return data
  }
}
