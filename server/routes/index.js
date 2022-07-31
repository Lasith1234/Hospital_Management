const express = require('express')
const router = express.Router()
const authController = require('./../controllers/authenticationController')



router.get('/', (req, res) => {
    res.send("Welcome to the Hospital Management Server")
})

router.post('/login', authController.loginUser)
module.exports = router