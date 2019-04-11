var cors = require('cors')
var express = require('express')
var bodyParser = require('body-parser')

var userRoute = require('./user/router')
var authRoute = require('./user/auth.router')
var categoryRoute = require('./question/category.router')
var questionRoute = require('./question/router')
var gameRoute = require('./game/router')

const morgan = require('morgan')

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(morgan('dev'))
app.use('/api/user', userRoute)
app.use('/api/category', categoryRoute)
app.use('/api/question', questionRoute)
app.use('/api/game', gameRoute)
app.use('/api/auth', authRoute)
module.exports = app