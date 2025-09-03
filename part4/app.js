const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blob.controller')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(middleware.errorHandler)
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)

module.exports = app
