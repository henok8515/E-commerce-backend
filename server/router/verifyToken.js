const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    console.log(authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, '12345678', (err, user) => {
            if (err) res.status().json('invalid Token')
            req.user = user
            next()
        })
    } else {
        return res.status(400).json('you are not atenticated')
    }
}
const verifyTokenAndAutorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(401).json('you are no autorized')
        }
    })
}
const verifyTokenandAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(401).json('you are no autorized')
        }
    })
}
module.exports = {
    verifyToken,
    verifyTokenAndAutorization,
    verifyTokenandAdmin,
}
