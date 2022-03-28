const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

function generateToken (params = {}) {
  return jwt.sign(params, JWT_SECRET, {
    expiresIn: 86400,
  })
}

module.exports = generateToken
