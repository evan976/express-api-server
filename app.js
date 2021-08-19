const express = require('express')
const consola = require('consola')
const morgan = require('morgan')
const cors = require('cors')

const router = require('./router')
const errorHandler = require('./middleware/error-handler')

const app = express()

// log
app.use(morgan('dev'))

app.use(express.json())

// cross
app.use(cors())

const PORT = process.env.PORT || 3000

app.use('/api/v1', router)

// error handler
app.use(errorHandler())

app.listen(PORT, () => {
  consola.success(`Server is running at http://localhost:${PORT}`)
})