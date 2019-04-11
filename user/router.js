var express = require('express')
var router = express.Router()
var User = require('./model')

// route /api/user
router.route('/')
// get users (dev)
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
    let newUser = new User();

    newUser.name = req.body.name;
    newUser.password = req.body.password;

    newUser.save()
        .then(user => {
            res.status(201).json({
                status: "success",
                message: "Your account created",
                data: {
                    "name": user.name,
                    "level": user.level,
                    "coins": user.coins,
                    "createdAt": user.createdAt,
                }
            })
        })
        .catch(error => {
            res.status(400).json({
                status: "fail",
                message: error.message,
                data: {
                    error: error
                }
            })
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