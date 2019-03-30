var mongoose = require('mongoose')
const {database_url} = require('.')
mongoose.Promise = global.Promise

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(database_url, { useNewUrlParser: true }).then(
    () => {
        console.log('Database is connected')
    },
    err => {
        console.log('Can not connect to the database'+ err)
    }
);
module.exports = mongoose.connection