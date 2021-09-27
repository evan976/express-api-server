/**
 * @module 用户控制器
 */

const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const HandleResponse = require('../core/response-handler')
const md5Decode = require('../utils/crypto')
const { jwtSecret } = require('../config/config.default')
class UserController {

  login ({ body: { username, password }}, res) {

    User.find({ username }, '_id username password')
      .then(([user]) => {
        if (!user) {
          return new HandleResponse('用户不存在').fail(res)
        }
        if (user.password === md5Decode(password)) {
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

  find (req, res) {
    User.find({}, '-_id id username email slogan gravatar created_at updated_at')
      .then(([user]) => {
        new HandleResponse({ user }, '获取个人信息成功').success(res)
      })
      .catch(err => {
        new HandleResponse('获取个人信息失败').fail(res)
      })
  }

  async update ({ body: user }, res) {
    try {
      const [_user] = await User.find({}, '_id username email password slogan gravatar')

      if (user.password) {

        let { password, new_password, rel_new_password } = user

        password = md5Decode(password)
        new_password = md5Decode(new_password)
        rel_new_password = md5Decode(rel_new_password)

        if (password || new_password || rel_new_password) {
          if ((!new_password || !rel_new_password) || new_password !== rel_new_password) {
            return new HandleResponse('两次输入密码不一致').fail(res)
          }
          if ([new_password, rel_new_password].includes(password)) {
            return new HandleResponse('新旧密码不可一致').fail(res)
          }
        }

        if (_user.password !== password) {
          return new HandleResponse('原密码不正确').fail(res)
        }
        if (rel_new_password) {
          user.password = rel_new_password
          Reflect.deleteProperty(user, 'new_password')
          Reflect.deleteProperty(user, 'rel_new_password')
        }
      }

      if (_user._id) {
        await User.findByIdAndUpdate(_user._id, user, { new: true })
        const [result] = await User.find({}, '-_id id username email slogan gravatar created_at updated_at')
        new HandleResponse({ result }, '用户资料更新成功').success(res)
      } else {
        return new HandleResponse('用户资料更新失败').fail(res)
      }

    } catch (err) {
      new HandleResponse('用户资料更新失败').fail(res)
    }
  }
}

module.exports = new UserController()
