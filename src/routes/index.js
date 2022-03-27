const { Router } = require('express')
const accountRoutes = require('./account.routes')
const userRoutes = require('./user.routes')
const routes = Router()

routes.use(accountRoutes)
routes.use(userRoutes)
routes.get('/', (req, res) => res.json({ message: 'Hello World' }))

module.exports = routes
