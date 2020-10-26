const router = require('express').Router()
const { signIn, signUp, auth } = require('../../handler/auth')

router.get("/", auth)
router.post("/signin", signIn)
router.post("/signup", signUp)

module.exports = router