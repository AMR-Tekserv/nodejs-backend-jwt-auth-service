const key = require('ckey')
const mongoose = require('mongoose')
mongoose.set("debug", true)
mongoose.Promise = Promise

// Connect to Database
mongoose.connect(key.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})

// Bundling
module.exports.User = require('./User')