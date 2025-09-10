const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blob.controller')
const userRouter = require('./controllers/users.controller')
const loginRouter = require('./controllers/login.controller')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)

module.exports = app
