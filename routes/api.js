const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User.js");
const { Board, boardSchema } = require("../models/Board.js");
const { Link, linkSchema } = require("../models/Link.js");

/* POST request to create new board */
router.post("/", (req, res) => {
  const { board_title } = req.body;
  const new_board = new Board({ board_title: board_title, links: [] });

  User.updateOne(
    { _id: req.user._id },
    {
      $push: { boards: new_board },
    }
  )
    .then((db_res) => {
      console.log(db_res);
      res.status(200).json({ success: true, _id: new_board._id });
    })
    .catch((err) => {
      res.status(200).json({ success: false });
      console.log(err);
    });
});

/* DELETE request to delete a current board */
router.delete("/:boardId", (req, res) => {
  const board_id = req.params.boardId;

  User.updateOne(
    { _id: req.user._id },
    { $pull: { boards: { _id: ObjectId(board_id) } } }
  )
    .then((db_res) => {
      console.log(db_res);
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(200).json({ success: false });
      console.log(err);
    });
});

/* PUT request to add a new link */
router.put("/add", (req, res) => {
  const { link_title, url, board_id } = req.body;
  const new_link = new Link({ link_title: link_title, url: url });

  User.updateOne(
    { _id: req.user._id, "boards._id": ObjectId(board_id) },
    { $push: { "boards.$.links": new_link } }
  )
    .then((res_db) => {
      console.log(res_db);
      res.status(200).json({ success: true, _id: new_link._id });
    })
    .catch((err) => {
      res.status(200).json({ success: false });
      console.log(err);
    });
});

/* PUT request to delete a current link */
router.put("/delete", (req, res) => {
  const { link_id, board_id } = req.body;
  User.updateOne(
    {
      _id: req.user._id,
      "boards._id": ObjectId(board_id),
    },
    {
      $pull: {
        "boards.$.links": { _id: ObjectId(link_id) },
      },
    }
  )
    .then((res_db) => {
      console.log(res_db);
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(200).json({ success: false });
      console.log(err);
    });
});

module.exports = router;
