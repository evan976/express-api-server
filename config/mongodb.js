/**
 * Mongodb module
 * @file 数据库配置
 * @module mongodb
 */

const mongoose = require('mongoose')
const consola = require('consola')
const autoIncrement = require('mongoose-auto-increment')
const config = require('./config.default')

// remove warning
mongoose.set('useFindAndModify', false)

// global Promise
mongoose.Promise = global.Promise

exports.mongoose = mongoose

// connect
exports.connect = () => {

  mongoose.connect(config.mongodb.uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise
  })

  const db = mongoose.connection

  // error
  db.on('error', error => {
    consola.warn('Database connection failed!', error)
  })

  // success
  db.once('open', () => {
    consola.success('Database connection is successful!')
  })

  // 自增 id 初始化
  autoIncrement.initialize(db)

  // 返回实例
  return mongoose

}
