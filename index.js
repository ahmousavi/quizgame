const dbConnection = require('./config/database')
const {port} = require('./config')

const app = require('./app')

app.listen(port, () => {
    console.log('Server started on http://127.0.0.1:'+port)
})