const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../modules/mailer.js')
const generateToken = require('../configs/jwt')

class AccountService {
  async executeRegistration ({ name, email, cpf, phone,  password }) {
    if (!name || !email || !cpf || !phone || !password) {
      throw new Error('It is mandatory to send all information.')
    }

    if (password.length < 8) {
      throw new Error('Password must be 8 or more characters.')
    }

    if (await User.findOne({ email })) {
      throw new Error('There is already a registered user with this email.')
    }

    if (await User.findOne({ cpf })) {
      throw new Error('There is already a user registered in this CPF.')
    }

    const user = await User.create({ name, email, cpf, phone, password })
    user.password = undefined
    
    return {
      user,
      token: generateToken({ data: user._id })
    }
  }

  async executeAuthentication ({ email, cpf, password }) {
    let user = {}
    
    if (!password) {
      throw new Error('It is mandatory to send the password.')
    }

    if (email) {
      user = await User.findOne({ email }).select('+password')
    } else if (cpf) {
      user = await User.findOne({ cpf }).select('+password')
    } else {
      throw new Error('It is mandatory to send all information.')
    }
    
    if (!user) {
      throw new Error('No users with this data were found.')
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new Error('Incorrect password.')
    }

    user.password = undefined

    return {
      user,
      token: generateToken({ data: user._id })
    }
  }

  async executeForgotUserPassword ({ email, cpf }) {
    let user = {}

    if (email) {
      user = await User.findOne({ email })
    } else if (cpf) {
      user = await User.findOne({ cpf })
    } else {
      throw new Error('It is mandatory to send all information.')
    }

    if (!user) {
      throw new Error('No users with this data were found.')
    }

    const token = crypto.randomBytes(20).toString('hex')
    const now = new Date()
    now.setHours(now.getHours() + 1)

    await User.findByIdAndUpdate(user._id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    })

    mailer.sendMail({
      to: user.email,
      from: 'fr.mich17@gmail.com',
      template: 'auth/forgot_password',
      context: { token }
    }, (error) => {
      if (error) {
        throw new Error('Cannot send forgot password email.')
      }
    })

    return { 
      user: { email: user.email },
      message: 'Check your email to change your password.'
    }
  }

  async executeResetUserPassword ({ email, cpf, token, password }) {
    let user = {}
    
    if (!token || !password) {
      throw new Error('It is mandatory to send all information.')
    }
    
    if (email) {
      user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires')
    } else if (cpf) {
      user = await User.findOne({ cpf }).select('+passwordResetToken passwordResetExpires')
    } else {
      throw new Error('It is mandatory to send all information.')
    }

    if (!user) {
      throw new Error('No users with this data were found.')
    }
    
    if (token > user.token) {
      throw new Error('Token invalid')
    }
    
    const now = new Date()
    
    if (now > user.passwordResetExpires) {
      throw new Error('Token, expired, generate a new one')
    }
    
    user.password = password
    
    await user.save()
  }
}

module.exports = AccountService
