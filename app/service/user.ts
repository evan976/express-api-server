import { Context } from 'egg'
import BaseService from './base'
import { compareSync } from 'bcrypt'

export default class UserService extends BaseService {
  constructor(app: Context) {
    super('User', app)
  }

  async findByIdAndUpdate(id: string, user: any): Promise<any> {
    const { ctx } = this
    const result = await ctx.model.User.findById(id).select('+password')

    // 修改密码
    if (user.password) {
      let { password, new_password, rel_new_password } = user

      if (password || new_password || rel_new_password) {
        if (
          !new_password ||
          !rel_new_password ||
          new_password !== rel_new_password
        ) {
          return ctx.helper.error({ ctx, message: '两次输入密码不一致' })
        }
        if ([new_password, rel_new_password].includes(password)) {
          return ctx.helper.error({ ctx, message: '新旧密码不可一致' })
        }
      }

      const isValid = compareSync(password, result.password)

      if (!isValid) {
        return ctx.helper.error({ ctx, message: '原密码不正确' })
      }

      if (rel_new_password) {
        // 新密码赋值并删除
        user.password = rel_new_password
        Reflect.deleteProperty(user, 'new_password')
        Reflect.deleteProperty(user, 'rel_new_password')
      }

      const data = await ctx.model.User.findByIdAndUpdate(id, user, {
        new: true,
        fields: { password: 0 }
      })

      return ctx.helper.success({ ctx, data })
    }
    const data = await ctx.model.User.findByIdAndUpdate(id, user, {
      new: true,
      fields: { password: 0 }
    })
    return ctx.helper.success({ ctx, data })
  }
}
