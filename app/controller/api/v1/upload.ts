import { Controller } from 'egg'
const fs = require('fs')
const path = require('path')
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const md5 = require('md5')
const qiniu = require('qiniu')

const bucket = 'your bucket'
const imageUrl = 'your imageUrl'
const accessKey = 'your accessKey'
const secretKey = 'your secretKey'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: bucket
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)
let config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2

export default class UploadController extends Controller {
  async index() {
    const { ctx } = this
    const stream = await ctx.getFileStream()
    const filename =
      md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase()

    // 本地临时文件
    const localFilePath = path.join(
      __dirname,
      '../../../public/uploads',
      filename
    )
    const writeStream = fs.createWriteStream(localFilePath)

    try {
      await awaitWriteStream(stream.pipe(writeStream))
      const formUploader = new qiniu.form_up.FormUploader(config)
      const putExtra = new qiniu.form_up.PutExtra()
      const imgSrc = await new Promise((resolve, reject) => {
        formUploader.putFile(
          uploadToken,
          filename,
          localFilePath,
          putExtra,
          (respErr, respBody, respInfo) => {
            if (respErr) {
              reject('')
            }
            if (respInfo.statusCode == 200) {
              resolve(imageUrl + respBody.key)
            } else {
              reject('')
            }
            // 上传之后删除本地文件
            fs.unlinkSync(localFilePath)
          }
        )
      })
      if (imgSrc !== '') {
        const data = {
          url: imgSrc
        }
        ctx.helper.success({ ctx, data })
      } else {
        return ctx.helper.error({ ctx, message: '上传出错' })
      }
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream)
      return ctx.helper.error({ ctx, message: err })
    }
  }
}
