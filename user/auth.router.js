var express = require('express');
var router = express.Router();
var User = require('../user/model');
const auth = require('./auth.controller')
// prefix /api/auth

// login
router.post('/', (req, res) => {
    let { name, password } = req.body;

    User.findOne({name: name})
        .then(user => {
            if (user) {
                user.checkPassword(password, (err, isMatch) => {
                    if (err) {
                        res.status(500).json({
                            status: "fail",
                            message: err.message,
                            data: {},
                        })
                    }
                    else if (isMatch){
                        let { access_token, refresh_token } = auth.generateToken({
                            "id":user._id,
                            "admin": user.admin,
                        })
                        res.status(202).json({
                            status: "success",
                            message: "شما با موفقیت وارد شدید",
                            data: {
                                access_token,
                                refresh_token
                            }
                        })
                    }
                    else {
                        res.status(401).json({
                            status: "fail",
                            message: "اطلاعات کاربری اشتباه است",
                            data: {},
                        })
                    }
                })
            }
            else {
                res.status(404).json({
                    status: "fail",
                    message: "اطلاعات کاربری اشتباه است",
                    data: {},
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                status: "fail",
                message: err.message,
                data: {},
            })
        })

})
router.post('/token/refresh', auth.checkToken, (req, res) => {
    if (req.decodedData.refresh) {
        
        // TODO : find user and generate new token

        // let { access_token, refresh_token } = auth.generateToken({
        //     "id":user._id,
        //     "admin": user.admin,
        // })

    }
    else {
        req.status(403).json({
            status: "fail",
            message: "use refersh token"
        })
    }
})
router.post('/test', (req, res) => {
    let {token} = req.body
    if (token) {
        auth.verifyToken(token)
        .then(data => {
            res.status(200).json({
                status: "success",
                message: "token verified",
                data: {
                    user: data
                },
            })
        })
        .catch(err => {
            res.status(400).json({
                status: "fail",
                message: err.message,
                data: {},
            })
        })
    }
    else {
        res.status(401).json({
            status: "fail",
            message: "no token",
            data: {},
        })
    }
})

module.exports = router