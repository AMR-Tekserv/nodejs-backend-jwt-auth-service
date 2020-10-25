const router = require('express').Router()
const { signIn, signUp } = require('../../handler/auth')

router.post("/signin", signIn)
router.post("/signup", signUp)

module.exports = router