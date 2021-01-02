const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const passport = require("passport");

const router = express.Router();

/* == Login Route == */
router.get("/login", (req, res) => {
  res.render("users/login", { dashboard: null, child_route: true });
  // note that .render() takes the relative route of the .ejs file from the "views" folder
});

/* == Register Route == */
router.get("/register", (req, res) => {
  res.render("users/register", { dashboard: null, child_route: true });
});

/* Re-render the register page to allow the
user to retry account registration. */
const registerRetry = (res, errors, name, email) => {
  res.render("users/register", {
    dashboard: null,
    child_route: true,
    errors,
    name,
    email,
  });
  /* Note: .render() path is directory
  path from the views folder */
};

/* == User Registration Form Submission == */
router.post("/register", async (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];

  /* Check that the required fields exist. */
  if (!name || !email || !password || !password2) {
    errors.push({ error_msg: "Please fill in all fields." });
  }

  /* Check if password match. */
  if (password !== password2) {
    errors.push({ error_msg: "Passwords do not match." });
  }

  /* Check password length. */
  if (password.length < 6) {
    errors.push({
      error_msg: "Password must be 6 characters long or greater.",
    });
  }

  /* If error(s) are triggered */
  if (errors.length > 0) {
    registerRetry(res, errors, name, email);
  } else {
    /* All registration validation
    have been met. */
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        /* Email is not unique and user already exists in db. */
        errors.push({ error_msg: "Email is already registered." });
        registerRetry(res, errors, name, email);
      } else {
        /* Email is unique and a new user should be created. */
        const newUser = new User({
          name: name,
          email: email,
          password: password,
          boards: [],
        });

        /* Generate hashed password */
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, async (err, hashed_password) => {
            if (err) throw err;

            newUser.password = hashed_password;

            try {
              /* Save user model instance with the new
              hashed password to the database. */
              await newUser.save();
              res.redirect("/users/login");
              /* Note: .redirect() path is URL
              path from localhost:5000/users */
            } catch (err) {
              console.log(err);
            }
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

/* == User Login Form Submission == */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);
/* Run passport.authenticate() middleware
upon POSTing our login request. This will
invoke our local strategy we defined earlier
in passport.js */

module.exports = router;
