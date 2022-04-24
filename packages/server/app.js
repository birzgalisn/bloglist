const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const path = require('path')
const cors = require('cors')
const registerRouter = require('./controllers/register')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Connecting to MongoDB')
mongoose
  .connect(config.MONGODB_URI, () => {
    logger.info('Connected to MongoDB')
  })
  .catch(err => logger.error('Error connecting to MongoDB:', err.message))

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/register', registerRouter)
app.use('/api/login', loginRouter)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'), err => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
