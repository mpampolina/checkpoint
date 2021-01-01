const express = require("express");
const router = express.Router();

/* Login Route */
router.get("/login", (req, res) => {
  res.render("users/login", { dashboard: null, child_route: true });
  // note that .render() takes the relative route of the .ejs file from the "views" folder
});

/* Register Route */
router.get("/register", (req, res) => {
  res.render("users/register", { dashboard: null, child_route: true });
});

module.exports = router;
