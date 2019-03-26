var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/quizofkings', { useNewUrlParser: true }).then(
    () => {
        console.log('Database is connected')
    },
    err => {
        console.log('Can not connect to the database'+ err)
    }
);
module.exports = mongoose.connection