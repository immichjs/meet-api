const mongoose = require('../configs/connectionMongoDB')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  cpf: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  userType: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
}, { versionKey: false })

UserSchema.pre('save', async function (next) {
  const encryptedPassword = await bcrypt.hash(this.password, 10)
  this.password = encryptedPassword

  next()
})

const Users = mongoose.model('Users', UserSchema)

module.exports = Users
