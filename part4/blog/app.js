const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)

module.exports = app
