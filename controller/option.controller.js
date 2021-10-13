/**
 * @module 全局配置
 */

const Option = require('../model/option.model')
const { handleError, handleSuccess } = require('../core/handle-request')

class OptionController {

  // 获取网站信息
  findOptions (req, res) {
    Option.find({})
      .then(([result]) => handleSuccess({ res, message: '获取网站信息成功', result }))
      .catch(err => handleError({ res, message: '获取网站信息失败', err }))
  }

  // 修改网站信息
  updateOptions ({ body: option }, res) {
    Option.find({})
      .then(([result]) => {
        if (result) {
          Option.findOneAndUpdate({}, option, { new: true })
            .then(result => handleSuccess({ res, message: '网站信息更新成功', result }))
            .catch(err => handleError({ res, message: '网站信息更新失败', err }))
        } else {
          new Option(option).save()
          return handleSuccess({ res, message: '网站信息更新成功' })
        }
      })
      .catch(err => handleError({ res, message: '网站信息更新失败', err }))
  }

}

module.exports = new OptionController()
