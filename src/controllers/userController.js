const UserService = require('../services/UserService')

class UserController {
  async listUsers (request, response) {
    const userService = new UserService()
    try {
      const users = await userService.executeListUsers()
      return response.status(200).json({ users })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  async listUser (request, response) {
    const userService = new UserService()

    try {
      const user = await userService.executeListUser(request.params)
      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}

module.exports = new UserController()
