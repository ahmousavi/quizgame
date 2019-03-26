var express = require('express')
var router = express.Router()
var User = require('./model')
router.route('/user')
.get((req, res) => {
    User.find({}, {}, (error, users) => {
        if (error) {
            res.status(400).json(error);
        }
        else {
            res.status(200).json(users)
        }
    }) 
    
})

// create new user
.post((req, res) => {
    let newUser = new User(req.body)
    newUser.save(error => {
        if (error) {
            res.status(400).json({message: error.message})
        }
        else {
            res.status(200).json({status:200, message: "Saved!", ...req.body})
        }
    })    
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