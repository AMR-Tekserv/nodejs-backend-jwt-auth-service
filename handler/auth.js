const key = require('ckey')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = {
    auth: async function (req, res, next) {

        try {
            const user = await User.findById(req.user.id).select('-password')
            res.json(user)
        } catch (err) {
            next(err)
        }
    },
    signUp: async function (req, res, next) {
        try {
            let user = await User.create(req.body)
            let { id, firstName, email } = user
            let token = jwt.sign({ id, firstName, email }, key.SECRET_KEY)
            return res.status(200).json([{ token, id, firstName, email, msg: "Sign up success." }])
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

            if (!user) {
                return res.status(500).json({ errors: [{ msg: "Invalid Credentials" }] })
            }

            const isMatch = await user.comparePassword(password)

            if (!isMatch) {
                return res.status(500).json({ errors: [{ msg: "Invalid Credentials" }] })
            }

            const payload = {
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email
                }
            }

            jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token })
            })

        } catch (err) {
            next(err)
        }
    }
}