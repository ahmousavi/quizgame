var cors = require('cors')
var express = require('express')
var bodyParser = require('body-parser')

var userRoute = require('./routes/user')
var categoryRoute = require('./routes/category')
var questionRoute = require('./routes/question')
var authRoute = require('./routes/auth')
const morgan = require('morgan')

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(morgan('dev'))
app.use('/api/user', userRoute)
app.use('/api/category', categoryRoute)
app.use('/api/question', questionRoute)
app.use('/api/auth', authRoute)
module.exports = app