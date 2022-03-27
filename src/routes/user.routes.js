const { Router } = require('express')
const authJWT = require('../middlewares/authentication')
const userController = require('../controllers/userController.js')
const router = Router()

router.get('/users', [authJWT], userController.listUsers)
router.get('/user/:id', [authJWT], userController.listUser)

module.exports = router
