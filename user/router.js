var express = require('express')
var router = express.Router()
var User = require('./model')
const {checkToken, generateToken} = require('./authentication')
// route /api/user

// get users (dev)
router.get('/', checkToken, (req, res) => {
    User.findOne(req.body, {_id:0, password:0, __v:0, token: 0}, (error, user) => {
        if (error) {
            res.status(400).json({
                status: "fail",
                message: error.name,
                data: error,
            })
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
router.get('/:name', checkToken, (req, res) => {
    User.findOne({name: req.params.name}, {_id:0, password:0, __v:0, token: 0}, (error, user) => {
        if (error) {
            res.status(400).json({
                status: "fail",
                message: error.name,
                data: error,
            })
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
            let token = generateToken({
                "id":user._id,
                "admin": user.admin,
            })
            res.status(201).json({
                status: "success",
                message: "حساب کاربری با موفقیت ایجاد شد",
                data: {
                    name: user.name,
                    level: user.level,
                    coins: user.coins,
                    token: token,
                    createdAt: user.createdAt,
                }
            })
        })
        .catch(error => {
            res.status(400).json({
                status: "fail",
                message: error.name,
                data: error
            })
        })   
})

// update user data
router.put('/', checkToken, (req, res) => {
    let user_id = req.decodedData.id;
    let newData = {};
    if (req.body.name) {
        newData.name = req.body.name;
    }
    if (req.body.password) {
        newData.password = req.body.password;
    }
    if (req.body.email) {
        newData.email = req.body.email;
    }
    
    User.findById(user_id, 
        function(error, user) {
            if (error) {
                res.status(500).send({
                    status: "fail",
                    message: error.message,
                    data: error,
                })
            }
            if (user) {
                if (req.body.name) {
                    user.name = req.body.name;
                }
                if (req.body.password) {
                    user.password = req.body.password;
                }
                if (req.body.email) {
                    user.email = req.body.email;
                }
                user.save().then(() => {
                    res.status(200).send({
                        status: "success",
                        message: "اطلاعات کاربری شما به روز شد",
                        data: user,
                    })
                })
                .catch(error => {
                    res.status(400).send({
                        status: "fail",
                        message: error.name,
                        data: error,
                    })
                })
            }
            else {
                res.status(404).send({
                    status: "fail",
                    message: "کاربر با این مشخصات وجود ندارد",
                    data: {}
                })
            }
        })
})

// delete user
router.delete('/', checkToken, (req, res) => {
    res.write('Delete user')
    res.end();
})

module.exports = router