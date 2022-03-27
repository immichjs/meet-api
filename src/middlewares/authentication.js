const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorizationHeader = request.headers.authorization

  if (!authorizationHeader) {
    return response.status(401).json({ message: 'The token was not provided.' })
  }

  const parts = authorizationHeader.split(' ')

  if (!parts.length === 2) {
    return response.status(401).json({ message: 'Invalid token.' })
  }
    
  const [scheme, token] = parts
    
  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ message: 'Badly formatted token.' })
  }

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return response.status(401).json({ message: 'Invalid token.' })
    }

    request.userId = decoded.id
    return next()
  })
}
