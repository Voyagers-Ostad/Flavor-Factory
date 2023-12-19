const JWT = require("jsonwebtoken")

const secret = 'mern123'

function createToken(user) {
    const payload = {
        _id: user._id,
        name:user.name,
        email: user.email,
        admin: user.admin
    }
    const token = JWT.sign(payload, secret, {
        expiresIn: '24h'
    })
    return token
}

function validateToken(token) {
    const payload = JWT.verify(token, secret)
    return payload
}
module.exports = { createToken, validateToken }