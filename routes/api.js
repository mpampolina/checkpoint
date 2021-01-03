const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { Board, boardSchema } = require("../models/Board.js");
const { Link, linkSchema } = require("../models/Link.js");

/* GET request to retrieve all boards */

/* POST request to create new board */
router.post("/users/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const { board_title } = req.body;

  res.status("200").json({ msg: "Request received " });
});
/* DELETE request to delete a current board */

/* PUT request to add a new link */

/* PUT request to delete a current link */

module.exports = router;
