var User = require('./model');
var jwt = require('jsonwebtoken');
const { secret } = require('../config')

// get user data , check validate , generate and return token
function generateToken(data) {
    if (typeof data !== 'object') {
        data = {}
    }
    let access_token = jwt.sign({ ...data }, secret, { algorithm: 'HS256' });
    let refresh_token = jwt.sign({ ...data, refresh: true }, secret, { algorithm: 'HS256' });
    return {
        access_token,
        refresh_token
    };
}

// verify token and return decoded data
function verifyToken(token) {
    return new Promise((resolve, reject) =>
    {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err || !decodedToken)
            {
                return reject(err)
            }

            resolve(decodedToken)
        })
    })
}

// middleware to check token
function checkToken(req, res, next) {

    // console.log("Auth middleware called");
    
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        verifyToken(req.headers.authorization.split(' ')[1])
            .then(decoded => {
                req.decodedData = decoded;
                next();
            })
            .catch(err => {
                res.status(401).send({
                    status: "fail",
                    message: err.message,
                    data: {
                        error: err,
                    }
                })
            })
    }
    else {
        res.status(401).send({
            status: "fail",
            message: "احراز هویت ممکن نیست",
            data: {}
        })
    }
}

module.exports = {
    verifyToken,
    generateToken,
    checkToken
}