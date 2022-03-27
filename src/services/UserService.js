const User = require('../models/Users')

class UserService {
  async executeListUsers () {
    const users = await User.find()

    if (!users.length) {
      throw new Error('No user found.')
    }

    return users
  }
  
  async executeListUser ({ id }) {
    const user = await User.findOne({ _id: id })

    if (!user) {
      throw new Error('User not found.')
    }

    return user
  }
}

module.exports = UserService
