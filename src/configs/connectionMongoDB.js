const mongoose = require('mongoose')
const databaseConnection = process.env.DATABASE_CONNECTION || 'mongodb://localhost/meet'

mongoose.connect(databaseConnection)
mongoose.Promise = global.Promise

module.exports = mongoose
