const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./user/router')
const authRoute = require('./user/auth.router')
const categoryRoute = require('./question/category.router')
const questionRoute = require('./question/router')
const gameRoute = require('./game/router')


const morgan = require('morgan')

const app = express()
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