const User = require('./user/model')
var db = require('./config/database')
User.findOne({name: "samir"})
.then(data => console.log('Date = ', data))
.catch(err => console.log('Error = ', err.message))