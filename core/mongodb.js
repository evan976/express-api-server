/**
 * @module 数据库配置
 */

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const { MONGODB } = require('../config/config.default')

mongoose.set('useFindAndModify', false)

mongoose.Promise = global.Promise

exports.mongoose = mongoose

exports.connect = () => {

  mongoose.connect(MONGODB.uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise
  })

  const db = mongoose.connection

  db.on('error', error => {
    console.log('❌ 数据库连接失败!', error)
  })

  db.once('open', () => {
    console.log('✅ 数据库连接准备就绪～')
  })

  // 自增 id 初始化
  autoIncrement.initialize(db)

  return mongoose
}
