const { Router } = require('express')
const accountRoutes = require('./account.routes')
const userRoutes = require('./user.routes')
const routes = Router()

routes.use(accountRoutes)
routes.use(userRoutes)
routes.get('/', (req, res) => res.json([
  {
    resource: '/register',
    method: 'POST',
    mandatoryAttributes: {
      name: 'String',
      email: 'String',
      cpf: 'String',
      phone: 'String',
      password: 'String'
    },
    return: {
      user: {
        name: '',
        email: '',
        cpf: '',
        phone: '',
        status: true,
        userType: '',
        createdAt: '',
        updatedAt: '',
        _id: ''
      },
      token: ''
    }
  }, {
    resource: '/login',
    method: 'POST',
    mandatoryAttributes: {
      email: 'String',
      cpf: 'String',
      password: 'String'
    },
    return: {
      user: {
        name: '',
        email: '',
        cpf: '',
        phone: '',
        status: true,
        userType: '',
        createdAt: '',
        updatedAt: '',
        _id: ''
      },
      token: ''
    }
  }, {
    resource: '/forgot_password',
    method: 'POST',
    mandatoryAttributes: {
      email: 'String',
      cpf: 'String',
    },
    return: {
      user: {
        email: ''
      },
      message: ''
    }
  }, {
    resource: '/reset_password',
    method: 'POST',
    mandatoryAttributes: {
      email: 'String',
      token: 'String',
      password: 'String'
    },
  }
]
))

module.exports = routes
