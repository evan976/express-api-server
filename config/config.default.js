/**
 * @module 全局配置
 */

const package = require('package')(module)

module.exports = {
  app: {
    port: process.env.APP_PORT || 8000,
    host: process.env.APP_HOST || 'localhost'
  },

  jwtSecret: process.env.JWTSECRET || 'nodeserver',

  mongodb: {
    uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
  },

  QINIU: {
    accessKey: process.env.ACCESSKEY,
    secretKey: process.env.SECRETKEY,
    scope: 'my-website-images',
    url: 'http://r059le9ks.hn-bkt.clouddn.com/'
  },

  info: {
    name: package.name,
    description: package.description,
    version: package.version,
    author: package.author,
    keywords: package.keywords,
    github: 'https://github.com/wujihua118'
  }
}
