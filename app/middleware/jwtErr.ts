import { Context } from 'egg'

module.exports = options => {
  return async function jwtErr(ctx: Context, next) {
    let token: any = ctx.request.header['authorization']
    let decode: any
    if (token) {
      token = token.split(' ')
      if (token[0] === 'Bearer') {
        try {
          // 解码token
          decode = ctx.app.jwt.verify(token[1], options.secret)
          await ctx.model.User.find({ username: decode.username })
          await next()
        } catch (error) {
          ctx.status = 401
          ctx.body = {
            code: 401,
            message: 'token错误或过期'
          }
          return
        }
      } else {
        ctx.status = 401
        ctx.body = {
          code: 401,
          message: 'token格式错误'
        }
        return
      }
    } else {
      ctx.status = 401
      ctx.body = {
        code: 401,
        message: '暂无权限'
      }
      return
    }
  }
}
