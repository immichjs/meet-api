const AccountService = require('../services/AccountService')

class AccountController {
  async registerUser (request, response) {
    const accountService = new AccountService()

    try {
      const user = await accountService.executeRegistration(request.body)
      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  async loginUser (request, response) {
    const accountService = new AccountService()

    try {
      const user = await accountService.executeAuthentication(request.body)
      return response.status(200).json(user)
    } catch(error) {
      return response.status(400).json({ message: error.message })
    }
  }

  async forgotUserPassword (request, response) {
    const accountService = new AccountService()

    try {
      const user = await accountService.executeForgotUserPassword(request.body)
      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  async resetUserPassword (request, response) {
    const accountService = new AccountService()
    
    try {
      await accountService.executeResetUserPassword(request.body)
      return response.status(200).send()
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}

module.exports = new AccountController()
