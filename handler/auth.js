const key = require('ckey')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = {
    signUp: async function (req, res, next) {
        try {
            let user = await User.create(req.body)
            let { id, firstName, email } = user
            let token = jwt.sign({ id, firstName, email }, key.SECRET_KEY)
            return res.status(200).json([{ token, id, firstName, email, msg: "Sign up success."}])
        } catch (err) {
            if (err.code === 1100) {
                err.message = "Sorry, that username and/or email is already taken."
            }
            next(err)
        }
    },
    signIn: async function (req, res, next) {
        try {
            let user = await User.findOne({ email: req.body.email })
            let { id, firstName, email } = user
            let isMatch = await user.comparePassword(req.body.password)

            if (isMatch) {
                let token = jwt.sign({ id, firstName, email }, key.SECRET_KEY)
                return res.status(200).json([{ token, id, firstName, email, msg: "Login success." }])
            } else {
                return next({ status: 400, msg: "Invalid Email/Password."})
            }

        } catch (err) {
            next(err)
        }
    }
}