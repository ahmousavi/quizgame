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
router.put('/:name', checkToken, (req, res) => {
    User.findOne({name: req.params.name}, 
        (error, user) => {
            if (error) {
                res.status(500).json({
                    status: "fail",
                    message: error.message,
                    data: error,
                })
            }
            if (user) {
                if (user._id.equals(req.decodedData.id)) {
                    if (req.body.name)
                        user.name = req.body.name;
                    if (req.body.password)
                            user.password = req.body.password;
                    if (req.body.email)
                        user.email = req.body.email;
                    user.save()
                    .then(data => {
                        res.status(200).json({
                            status: "success",
                            message: "اطلاعات کاربری شما بروز شد",
                            data: data,
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            status: "fail",
                            message: err.message,
                            data: err,
                        });
                    })
                }
                else if (req.decodedData.admin) {
                    // TODO: admin edits
                    res.status(200).json({
                        status: "test",
                        message: "این یعنی شما یک ادمین هستید و قصد دارید اطلاعات یک کاربر را تغییر دهید",
                        data: {
                            user,
                            target,
                        },
                    });
                }
                else {
                    res.status(403).json({
                        status: "fail",
                        message: "شما مجوز ویرایش اطلاعات این کاربر را ندارید",
                        data: {},
                    });
                }
            }
            else {
                res.status(404).json({
                    status: "fail",
                    message: "کاربر با این مشخصات وجود ندارد",
                    data: req.params.name,
                });
            }
        })
})

// delete user
router.delete('/:name', checkToken, (req, res) => {
    if (req.decodedData.admin) {
        User.updateOne({name: req.params.name}, {removed: true}, function(err, data) {
            if (err) {
                res.status(500).json({
                    status: "fail",
                    message: err.message,
                    data: err,
                })
            }
            else {
                res.status(200).json({
                    status: "success",
                    message: "کاربر حذف شد",
                    data: {},
                })
            }
        })
    }
    else {
        res.status(403).json({
            status: "fail",
            message: "شما مجوز حذف کاربر را ندارید",
            data: {},
        })
    }
})

module.exports = router