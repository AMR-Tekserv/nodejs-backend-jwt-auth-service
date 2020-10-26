const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
        return next({ status: 401, message: "Please login first." });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded.user
        next()

    } catch (err) {
        return next({ status: 401, message: "Please login first." });
    }
}