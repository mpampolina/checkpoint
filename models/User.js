const mongoose = require("mongoose");
const { Board, boardSchema } = require("./Board.js");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  boards: {
    type: [boardSchema],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
