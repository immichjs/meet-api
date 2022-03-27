const { Router } = require('express')
const accountController = require('../controllers/accountController')
const router = Router()

router.post('/register', accountController.registerUser)
router.post('/login', accountController.loginUser)
router.post('/forgot_password', accountController.forgotUserPassword)
router.post('/reset_password', accountController.resetUserPassword)

module.exports = router
