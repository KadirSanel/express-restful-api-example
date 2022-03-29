const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) res.status(403).json("Authenticate error : Token is not valid!")
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("Authenticate error: Token header not found!")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("Authenticate error: You r not allowed to do that!")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("Authenticate error: You r not allowed to do that!")
        }
    })
}

module.exports = {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}