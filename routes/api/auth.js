const router = require('express').Router()
const { signIn, signUp, auth } = require('../../handler/auth')
const isAuth = require('../../middleware/auth')

router.get("/", isAuth, auth)
router.post("/signin", signIn)
router.post("/signup", signUp)

module.exports = router