/**
 * @module 用户控制器
 */

const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const { md5Decode, decodePassword} = require('../utils/encrypt')
const { handleError, handleSuccess } = require('../core/handle-request')
const { JWTSECRET } = require('../config/config.default')

class UserController {

  // 登录
  login ({ body: { username, password }}, res) {

    User.find({ username }, 'username password')
      .then(([user]) => {
        if (!user) {
          return handleError({ res, message: '用户不存在' })
        }
        if (user.password === md5Decode(decodePassword(password))) {
          const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
            data: user._id
          }, JWTSECRET)
          handleSuccess({ res, message: '登录成功', result: token })
        } else {
          return handleError({ res, message: '密码错误' })
        }
      })
      .catch(err => handleError({ res, message: '登录失败', err }))
  }

  // 注册
  register ({ body: { username, email, password, rel_password }}, res) {

    if (!username) return handleError({ res, message: '用户名不能为空' })

    if (!password) return handleError({ res, message: '密码不能为空' })

    if (!email) return handleError({ res, message: '邮箱不能为空' })

    User.find({ username })
      .then(users => {
        users.length
          ? handleError({ res, message: '用户名已存在，换个名字吧～' })
          : saveUser()
      })
      .catch(err => handleError({ res, message: '用户注册失败', err }))

    const saveUser = () => {

      // 两次密码编码
      password = md5Decode(decodePassword(password))
      rel_password = md5Decode(decodePassword(rel_password))

      if (password !== rel_password) {
        return handleError({ res, message: '两次输入密码不一致' })
      }

      new User({ username, email, password }).save()
        .then(() => handleSuccess({ res, message: '用户注册成功' }))
        .catch(err => handleError({ res, message: '用户注册失败', err }))
    }
  }

  // 获取个人信息
  find ({ user_id }, res) {
    User.findById(user_id, '-_id id username email slogan gravatar created_at updated_at')
      .then(result => handleSuccess({ res, message: '获取个人信息成功', result }))
      .catch(err => handleError({ res, message: '获取个人信息失败', err }))
  }

  // 修改个人信息
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
              return handleError({ res, message: '两次输入密码不一致' })
            }

            if ([new_password, rel_new_password].includes(password)) {
              return handleError({ res, message: '新旧密码不可一致' })
            }
          }

          if (result.password !== md5Decode(password)) {
            return handleError({ res, message: '原密码不正确' })
          }

          if (rel_new_password) {
            // 更新后的密码赋值（并将 user 中新密码和确认新密码删除）=> user: { "password": "xxx" }
            user.password = md5Decode(rel_new_password)
            Reflect.deleteProperty(user, 'new_password')
            Reflect.deleteProperty(user, 'rel_new_password')
          }

          User.findByIdAndUpdate(user_id, user, { new: true })
            .then(() => handleSuccess({ res, message: '密码修改成功' }))
            .catch(err => handleError({ res, message: '密码修改失败', err }))
        }

        // 设置 fields 控制返回字段（不返回密码）
        User.findByIdAndUpdate(user_id, user, { new: true, fields: { 'password': 0 } })
            .then(result => handleSuccess({ res, message: '用户资料更新成功', result }))
            .catch(err => handleError({ res, message: '用户资料更新失败', err }))
      })
      .catch(err => handleError({ res, message: '用户资料更新失败', err }))
  }
}

module.exports = new UserController()
