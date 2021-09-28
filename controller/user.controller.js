/**
 * @module 用户控制器
 */

const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const HandleResponse = require('../core/response-handler')
const { md5Decode, decodePassword} = require('../utils/encrypt')
const { jwtSecret } = require('../config/config.default')

class UserController {

  login ({ body: { username, password }}, res) {

    User.find({ username }, 'username password')
      .then(([user]) => {
        if (!user) {
          return new HandleResponse('用户不存在').fail(res)
        }
        if (user.password === md5Decode(decodePassword(password))) {
          const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
            data: user._id
          }, jwtSecret)
          new HandleResponse({ token }, '登录成功').success(res)
        } else {
          return new HandleResponse('密码错误').fail(res)
        }
      })
      .catch(err => {
        new HandleResponse('登录失败').fail(res)
      })
  }

  register ({ body: { username, email, password, rel_password }}, res) {

    if (!username) return new HandleResponse('用户名不能为空').fail(res)

    if (!password) return new HandleResponse('密码不能为空').fail(res)

    if (!email) return new HandleResponse('邮箱不能为空').fail(res)

    User.find({ username })
      .then(users => {
        users.length
          ? new HandleResponse('用户名已存在，换个名字吧～')
          : saveUser()
      })
      .catch(err => {
        new HandleResponse('用户注册失败').fail(res)
      })

    const saveUser = () => {

      // 两次密码编码
      password = md5Decode(decodePassword(password))
      rel_password = md5Decode(decodePassword(rel_password))

      if (password !== rel_password) {
        return new HandleResponse('两次输入密码不一致').fail(res)
      }

      new User({ username, email, password }).save()
        .then(() => {
          new HandleResponse('用户注册成功').success(res)
        })
        .catch(err => {
          new HandleResponse('用户注册失败').fail(res)
        })
    }
  }

  find ({ user_id }, res) {
    User.findById(user_id, '-_id id username email slogan gravatar created_at updated_at')
      .then((user) => {
        new HandleResponse({ user }, '获取个人信息成功').success(res)
      })
      .catch(err => {
        new HandleResponse('获取个人信息失败').fail(res)
      })
  }

  update ({ body: user, user_id }, res) {

    User.findById(user_id, 'username email password slogan gravatar')
      .then(result => {

        if (user.password) {

          let { password, new_password, rel_new_password } = user

          // 密码编码
          password = decodePassword(password)
          new_password = decodePassword(new_password)
          rel_new_password = decodePassword(rel_new_password)

          if (password || new_password || rel_new_password) {
            if ((!new_password || !rel_new_password) || new_password !== rel_new_password) {
              return new HandleResponse('两次输入密码不一致').fail(res)
            }

            if ([new_password, rel_new_password].includes(password)) {
              return new HandleResponse('新旧密码不可一致').fail(res)
            }
          }

          if (result.password !== md5Decode(password)) {
            return new HandleResponse('原密码不正确').fail(res)
          }

          if (rel_new_password) {
            // 更新后的密码赋值（并将 user 中新密码和确认新密码删除）=> user: { "password": "xxx" }
            user.password = md5Decode(rel_new_password)
            Reflect.deleteProperty(user, 'new_password')
            Reflect.deleteProperty(user, 'rel_new_password')
          }

          User.findByIdAndUpdate(user_id, user, { new: true })
            .then(() => new HandleResponse('密码修改成功').success(res))
            .catch(err => new HandleResponse('密码修改失败').fail(res))
        }

        // 设置 fields 控制返回字段（不返回密码）
        User.findByIdAndUpdate(user_id, user, { new: true, fields: { 'password': 0 } })
            .then(result => new HandleResponse({ result }, '用户资料更新成功').success(res))
            .catch(err => new HandleResponse('用户资料更新失败').fail(res))
      })
      .catch(err => new HandleResponse('用户资料更新失败').fail(res))
  }
}

module.exports = new UserController()
