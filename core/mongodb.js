/**
 * @module 数据库配置
 */

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const config = require('../config/config.default')

mongoose.set('useFindAndModify', false)

mongoose.Promise = global.Promise

exports.mongoose = mongoose

exports.connect = () => {

  mongoose.connect(config.mongodb.uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise
  })

  const db = mongoose.connection

  db.on('error', error => {
    console.log('Database connection failed!', error)
  })

  db.once('open', () => {
    console.log('Database connection is successful!')
  })

  // 自增 id 初始化
  autoIncrement.initialize(db)

  return mongoose
}
