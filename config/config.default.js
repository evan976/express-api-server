/**
 * @module 全局配置
 */

const package = require('package')(module)

module.exports = {
  app: {
    port: process.env.PORT || 8000,
    host: process.env.HOST || 'localhost'
  },

  jwtSecret: 'nodeserver',

  mongodb: {
    uri: 'mongodb://127.0.0.1:27017/node-app-server'
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
