const { Router } = require('express')
const accountRoutes = require('./account.routes')
const userRoutes = require('./user.routes')
const routes = Router()

routes.use(accountRoutes)
routes.use(userRoutes)

module.exports = routes
