const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const recipesRouter = require('./controllers/recipes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// logger.info('app.js -> connecting to', config.MONGODB_URI, process.env.MONGODB_URL);

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('app.js-> connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

app.use('/api/recipes', recipesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app