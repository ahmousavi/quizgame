var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var db = require('./config/db')
var userRoute = require('./user/route')
var authRoute = require('./config/auth')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use((req, res, next) => {
    console.log(`=> A ${req.method} request recived : ${req.path}`);
    next();
})

app.use('/api', userRoute)
app.use('/api/auth', authRoute)

app.listen(8000, () => console.log('Server started on http://127.0.0.1:8000'))