/**
 * @module 全局配置
 */

const package = require('package')(module)

module.exports = {
  APP: {
    port: process.env.APP_PORT || 8000,
    host: process.env.APP_HOST || 'localhost'
  },

  JWTSECRET: process.env.JWTSECRET || 'nodeserver',

  MONGODB: {
    uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root'
  },

  QINIU: {
    accessKey: process.env.ACCESSKEY,
    secretKey: process.env.SECRETKEY,
    scope: 'my-website-images',
    url: 'http://r059le9ks.hn-bkt.clouddn.com/'
  },

  INFO: {
    name: package.name,
    description: package.description,
    version: package.version,
    author: package.author,
    keywords: package.keywords,
    github: 'https://github.com/wujihua118'
  }
}
