const mongoose = require('mongoose')

module.exports = mongoose.model(
  'users',
  mongoose.Schema({
    name: String,
    password: String,
  })
)
