var express = require('express');
var router = express.Router();
var User = require('./../user/model');
var jwt = require('jsonwebtoken')
// prefix /api/auth
router.post('/', (req, res) => {
    let { name, password } = req.body;
    console.log(name, password);
    User.findOne({name: name, password: password}, (err, user) => {
        if (err) {
            res.status(500).json({message: err.message})
        }
        if (user) {
            jwt.sign({name}, 'this-is-secret-key', (err, token) => {
                User.updateOne({name: name}, {$set:{token: token}}, (err, raw) => {
                    if (err) {
                        res.status(500).json({message: '[saving token]' + err.message})
                    }
                    else {
                        res.status(200).json({token})
                    }
                })
            })
        }
        else {
            res.status(404).json({message: "user name or password is wrong"})
        }
    })
})

module.exports = router