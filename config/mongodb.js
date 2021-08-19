/**
 * Mongodb module
 * @file 数据库配置
 * @module mongodb
 */

const mongoose = require('mongoose')
const consola = require('consola')
const autoIncrement = require('mongoose-auto-increment')
const config = require('./config.default')

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
    consola.warn('Database connection failed!', error)
  })

  db.once('open', () => {
    consola.success('Database connection is successful!')
  })

  autoIncrement.initialize(db)

  return mongoose

}
