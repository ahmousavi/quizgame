var express = require('express')
var router = express.Router()

router.route('/user')
.get((req, res) => {
    res.write('Get users')
    res.send();
})

// create new user
.post((req, res) => {
    res.write('Create user')
    res.send();
})
// update user data

.put((req, res) => {
    res.write('Update user')
    res.send();
})

// delete user
.delete((req, res) => {
    res.write('Delete user')
    res.send();
})

module.exports = router