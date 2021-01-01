const mongoose = require("mongoose")

const linkSchema = new mongoose.Schema({
  link_title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

const boardSchema = new mongoose.Schema({
  board_title: {
    type: String,
    required: true
  },
  links: {
    type: [linkSchema],
    required: true
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  boards: {
    type: [boardSchema],
    required: true
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;