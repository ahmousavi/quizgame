var express = require('express')
var router = express.Router()
var User = require('./model')
const {checkToken} = require('./authentication')
// route /api/user

// get users (dev)
router.get('/', checkToken, (req, res) => {    
    User.findOne({name: req.body.name}, {_id:0, password:0, __v:0}, (error, user) => {
        if (error) {
            res.status(400).json(error);
        }
        else {
            res.status(200).json({
                status: "success",
                message: "",
                data: user,
            })
        }
    }) 
    
})

// create new user
router.post('/', (req, res) => {
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
router.put('/', checkToken, (req, res) => {
    res.write('Update user')
    res.end();
})

// delete user
router.delete('/', checkToken, (req, res) => {
    res.write('Delete user')
    res.end();
})

module.exports = router