var cors = require('cors')
var express = require('express')
var bodyParser = require('body-parser')

var userRoute = require('./routes/user')
var authRoute = require('./routes/auth')
const morgan = require('morgan')
var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(morgan('dev'))
app.use('/api', userRoute)
app.use('/api/auth', authRoute)
module.exports = app