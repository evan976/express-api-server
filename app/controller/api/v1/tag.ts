import { Context } from 'egg'
import BaseController from './base'

export default class TagController extends BaseController {
  constructor(app: Context) {
    super('tag', app)
  }
}
