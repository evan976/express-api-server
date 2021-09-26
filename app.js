/**
 * @module 入口文件
 */

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const mongodb = require('./core/mongodb')

mongodb.connect()

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('/api/private/v1', require('./router'))

module.exports = app
