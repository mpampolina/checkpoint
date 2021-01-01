const mongoose = require("mongoose")

const linkSchema = new mongoose.Schema({
  link_title: String,
  url: String
})

const boardSchema = new mongoose.Schema({
  board_title: String,
  links: [linkSchema]
})

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  boards: [boardSchema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;