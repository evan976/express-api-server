/**
 * @module 数据库配置
 */

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const { MONGODB } = require('../config/config.default')

mongoose.Promise = global.Promise

exports.mongoose = mongoose

exports.connect = () => {

  mongoose.connect(MONGODB.uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    promiseLibrary: global.Promise
  })

  const db = mongoose.connection

  db.on('error', error => {
    console.log('❌ Database connection failure!', error)
  })

  db.once('open', () => {
    console.log('✅ Database connection is ready!')
  })

  // 自增 id 初始化
  autoIncrement.initialize(db)

  return mongoose
}
