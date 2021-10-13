/**
 * @module 图片上传控制器
 */

const qiniu = require('qiniu')
const formidable = require('formidable')
const { QINIU } = require('../config/config.default')
const { handleError, handleSuccess } = require('../core/handle-request')

const mac = new qiniu.auth.digest.Mac(QINIU.accessKey, QINIU.secretKey)
const config = new qiniu.conf.Config({
  // 华南地区 Zone 对象
  // 参照：https://developer.qiniu.com/kodo/1289/nodejs
  zone: qiniu.zone.Zone_z2
})

// 构建上传策略
const putPolicy = new qiniu.rs.PutPolicy({
  scope: QINIU.scope,
  expires: 7200
})
const bucketManager = new qiniu.rs.BucketManager(mac, config)

// 获取上传凭证
const getUpToken = () => {
  const uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}

// 上传图片至七牛
const upload = (req, res) => {
  const form = new formidable.IncomingForm({
    multiples: true,
    keepExtensions: true,   // 保留后缀
    maxFieldsSize: 5 * 1024 * 1024  // 限制最大 5MB
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      return handleError({ res, message: '上传出错' })
    }

    // 上传到七牛后保存的文件名
    let key = new Date().getTime()

    // 获取上传凭证 token
    let token = getUpToken()

    // 要上传文件的本地路径 (表单 type 为 file)
    let filePath = files.file.path

    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()

    formUploader.putFile(token, key, filePath, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        return handleError({ res, message: '上传出错' })
      }

      // 上传成功，返回七牛云中图片地址
      if (respInfo.statusCode === 200) {
        const result = {
          'url': QINIU.url + key
        }
        handleSuccess({ res, message: '上传图片成功', result })
      } else {
        return handleError({ res, message: '图片上传失败' })
      }
    })
  })
}

// 获取图片列表
const findAll = (req, res) => {
  bucketManager.listPrefix(QINIU.scope, 1000, (respErr, respBody, respInfo) => {
    if (respErr) {
      return handleError({ res, message: '请求出错', err: respErr })
    }
    if (respInfo.statusCode === 200) {
      const result = respBody.items && respBody.items.map(item => {
        return {
          key: item.key,
          type: item.mimeType,
          url: QINIU.url + item.key
        }
      })
      return handleSuccess({ res, message: '图片列表获取成功', result })
    } else {
      return handleError({ res, message: '图片列表获取失败' })
    }
  })
}

// 删除单个图片
const remove = ({ params: { key } }, res) => {
  bucketManager.delete(QINIU.scope, key, (err, respBody, respInfo) => {
    if (err) {
      return handleError({ res, message: '请求出错', err })
    } else {
      respInfo.statusCode === 200
        ? handleSuccess({ res, message: '图片删除成功' })
        : handleError({ res, message: '图片删除失败' })
    }

  })
}

module.exports = {
  findAll,
  upload,
  remove
}
