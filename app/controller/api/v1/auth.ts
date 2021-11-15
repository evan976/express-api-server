import { Controller } from 'egg'
import { compareSync } from 'bcrypt'

export default class authController extends Controller {
  async register() {
    const { ctx } = this
    let { username, email, password, rel_password } = ctx.request.body

    if (!username || !password) {
      return ctx.helper.error({ ctx, message: '用户名或密码不能为空' })
    }

    const isExist = await ctx.service.user.find({
      $or: [{ username }, { email }]
    })

    if (isExist.data.length) {
      return ctx.helper.error({ ctx, message: '用户已存在' })
    }

    if (password !== rel_password) {
      return ctx.helper.error({ ctx, message: '两次输入密码不一致' })
    }

    const user = await this.service.user.save({ username, email, password })

    ctx.helper.success({ ctx, message: '用户注册成功', data: user })
  }

  async login() {
    const { ctx } = this
    let { username, password } = ctx.request.body

    if (!username || !password) {
      return ctx.helper.error({ ctx, message: '用户名或密码不能为空' })
    }

    const user = await ctx.model.User.findOne({ username }).select('+password')
    if (!user) {
      return ctx.helper.error({ ctx, message: '用户不存在' })
    }

    const isValid = compareSync(password, user.password)
    if (!isValid) {
      return ctx.helper.error({ ctx, message: '密码错误' })
    }

    const token = ctx.app.jwt.sign(
      { ...ctx.request.body },
      this.app.config.jwt.secret,
      { expiresIn: '7d' }
    )

    ctx.helper.success({ ctx, message: '登录成功', data: token })
  }
}
