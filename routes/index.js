const express = require("express");
const router = express.Router();
const auth = require("../config/auth.js");

/* Landing Page Route */
router.get("/", (req, res) => {
  /* render landing.ejs with { variables }*/
  res.render("landing", { child_route: false, user: req.user});
});

/* Dashboard Route */
router.get("/dashboard", auth.ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    child_route: false,
    dashboard: true,
    user: req.user,
  });
});

module.exports = router;
