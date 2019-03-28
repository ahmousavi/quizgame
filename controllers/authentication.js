var User = require('../models/user');
var jwt = require('jsonwebtoken');
const { secret } = require('../config')

// get user data , check validate , generate and return token
function generateToken(data) {
    if (typeof data !== 'object') {
        data = {}
    }
    let token = jwt.sign({ data }, secret, { algorithm: 'HS256' })
    return token;
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


module.exports = {
    verifyToken,
    generateToken,
}