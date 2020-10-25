const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hasher, comparePassword } = require("pcypher")

const userSchema =  new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) {
            return next()
        }
        let hashedPassword = await hasher(this.password)
        this.password = hashedPassword
        return next()
    } catch (err) {
        return next(err)
    }
})

userSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = await comparePassword(candidatePassword, this.password)
        return isMatch
    } catch (err) {
        return next(err)
    }
}

module.exports = User = mongoose.model('User', userSchema)