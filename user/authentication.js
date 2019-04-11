var User = require('../user/model');
var jwt = require('jsonwebtoken');
const { secret } = require('../config')

// get user data , check validate , generate and return token
function generateToken(data) {
    if (typeof data !== 'object') {
        data = {}
    }
    let token = jwt.sign({ ...data }, secret, { algorithm: 'HS256' })
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

function authenticate(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return verifyToken(req.headers.authorization.split(' ')[1]);
    }
    else {
        return null;
    }
}

module.exports = {
    verifyToken,
    generateToken,
}