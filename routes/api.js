const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User.js");
const { Board, boardSchema } = require("../models/Board.js");
const { Link, linkSchema } = require("../models/Link.js");

/* GET request to retrieve all boards */

/* POST request to create new board */
router.post("/", (req, res) => {
  const { board_title } = req.body;
  console.log(`COMMAND - post - USER - ${req.user.name}`);

  res.status("200").json({ success: true, _id: ObjectId() });
});

/* DELETE request to delete a current board */
router.delete("/:boardId", (req, res) => {
  const board_id = req.params.boardId;
  console.log(`COMMAND - delete - USER - ${req.user.name}`);
  console.log(`board_id: ${board_id}`);

  res.status(200).json({ success: true });
});

/* PUT request to add a new link */
router.put("/add", (req, res) => {
  const { link_title, url, board_id } = req.body;
  console.log(`COMMAND - put/add - USER - ${req.user.name}`);
  console.log(`link_title: ${link_title}`);
  console.log(`url: ${url}`);
  console.log(`board_id: ${board_id}`);

  res.status(200).json({ success: true, _id: ObjectId() });
});

/* PUT request to delete a current link */
router.put("/delete", (req, res) => {
  const { link_id, board_id } = req.body;
  console.log(`COMMAND - put/delete - USER - ${req.user.name}`);
  console.log(`link_id: ${link_id}`);
  console.log(`board_id: ${board_id}`);

  res.status(200).json({ success: true });
});

module.exports = router;
