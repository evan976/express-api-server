/**
 * @module 全局配置
 */

const Option = require('../model/option.model')
const HandleResponse = require('../core/response-handler')

class OptionController {

  findOptions (req, res) {
    Option.find({})
      .then(([result]) => {
        new HandleResponse({ result }, '获取网站信息成功').success(res)
      })
      .catch(err => {
        new HandleResponse('获取网站信息失败').fail(res)
      })
  }

  updateOptions ({ body: option }, res) {
    Option.find({})
      .then(([result]) => {
        if (result) {
          Option.findOneAndUpdate({}, option, { new: true })
            .then(result => {
              new HandleResponse({ result }, '网站信息更新成功').success(res)
            })
            .catch(err => {
              new HandleResponse('网站信息更新失败').fail(res)
            })
        } else {
          new Option(option).save()
        }
      })
      .catch(err => {
        new HandleResponse('失败').fail(res)
      })
  }

}

module.exports = new OptionController()
