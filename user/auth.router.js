var express = require('express');
var router = express.Router();
var User = require('../user/model');
const authentication = require('./authentication')
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
                        let token = authentication.generateToken({
                            "id":user._id,
                            "admin": user.admin,
                        })
                        res.status(202).json({
                            status: "success",
                            message: "Login successful",
                            data: {
                                token: token,
                            }
                        })
                    }
                    else {
                        res.status(401).json({
                            status: "fail",
                            message: "Wrong password",
                            data: {},
                        })
                    }
                })
            }
            else {
                res.status(404).json({
                    status: "fail",
                    message: "User not found",
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

router.post('/test', (req, res) => {
    let {token} = req.body
    if (token) {
        authentication.verifyToken(token)
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