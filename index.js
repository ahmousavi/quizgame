require('dotenv').config()

const dbConnection = require('./config/database')
const config = require('./config')

const app = require('./app')

app.listen(config.port, () => {
    console.log('Server started on http://127.0.0.1:' + config.port)
})