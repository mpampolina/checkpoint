const mongoose = require("mongoose");
const { Link, linkSchema } = require("./Link.js");

const boardSchema = new mongoose.Schema({
  board_title: {
    type: String,
    required: true,
  },
  links: {
    type: [linkSchema],
    required: true,
  },
});

const Board = mongoose.model("Board", boardSchema);

module.exports = { Board, boardSchema };
