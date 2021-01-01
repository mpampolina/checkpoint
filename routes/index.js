const express = require("express");
const router = express.Router();

/* Landing Page Route */
router.get("/", (req, res) => {
  res.render("landing", { dashboard: null, child_route: false });
});

/* Dashboard Route */
router.get("/dashboard", (req, res) => {
  res.render("dashboard", { dashboard: true, child_route: false });
});

module.exports = router;
