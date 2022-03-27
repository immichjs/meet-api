const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

function generateToken (params = {}) {
  return jwt.sign(params, SECRET, {
    expiresIn: 86400,
  })
}

module.exports = generateToken
