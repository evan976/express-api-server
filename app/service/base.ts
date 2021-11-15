import { Service, Context } from 'egg'

export default class BaseService extends Service {
  private model: string
  constructor(model: string, app: Context) {
    super(app)
    this.model = model
  }

  /**
   * 获取列表数据
   * @param query 查询参数
   * @param page 当前页码
   * @param pageSize 每页显示数量
   * @returns Promise<any>
   */
  async find(query = {}, page = 1, pageSize = 10): Promise<any> {
    const data = await this.app.model[this.model]
      .find(query, '-__v -_id')
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort({ _id: -1 })

    const total = await this.app.model[this.model].countDocuments(query)
    return {
      total,
      pages: Math.ceil(total / pageSize),
      data
    }
  }

  /**
   * 获取单条数据
   * @param id 文章 Id
   * @returns Promise<any>
   */
  async findById(id: string): Promise<any> {
    const data = await this.app.model[this.model].findById(id)
    return data
  }

  /**
   * @param id id
   * @param model 模型
   * @returns Promise<any>
   */
  async findByIdAndUpdate(id: string, model: any): Promise<any> {
    const data = await this.app.model[this.model].findByIdAndUpdate(id, model, {
      upsert: true,
      new: true
    })
    return data
  }

  /**
   * 新增单条数据
   * @param model 模型
   * @returns Promise<any>
   */
  async save(model: any): Promise<any> {
    const data = new this.app.model[this.model](model)
    await data.save()
    return data
  }

  /**
   * 删除单条数据
   * @param id 文章 id
   * @returns Promise<any>
   */
  async findByIdAndRemove(id: string): Promise<any> {
    const data = await this.app.model[this.model].findByIdAndRemove(id)
    return data
  }

  /**
   * 删除多条数据
   * @param ids id
   * @returns Promise<any>
   */
  async findByIdAndRemoveMany(ids: string[]): Promise<any> {
    const data = await this.app.model[this.model].remove({
      _id: { $in: ids }
    })
    return data
  }
}
