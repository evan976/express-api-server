const http = require('http')
const express = require('express')
const consola = require('consola')
const morgan = require('morgan')
const cors = require('cors')

const mongodb = require('./config/mongodb')
const config = require('./config/config.default')
const enviroment = require('./enviroment')
const errorHandler = require('./middleware/error-handler')

// db connect
mongodb.connect()

const app = express()

// log
app.use(morgan('dev'))

app.use(express.json())

// cross
app.use(cors())

const port = config.app.port

// router
const router = require('./router')
app.use('/api/v1', router)

// error handler
app.use(errorHandler())

http.createServer(app).listen(port, () => {
  consola.success(`Server is running at ${port} port, env: ${enviroment.enviroment}`)
})
