import { Context } from 'egg'
import BaseController from './base'

export default class CategoryController extends BaseController {
  constructor(app: Context) {
    super('category', app)
  }
}
