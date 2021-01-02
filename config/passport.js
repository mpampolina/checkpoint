const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

module.exports = (passport) => {
  /* Strategy to run every time a user is authenticated. */
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      /* Match User from the database */
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          /* There was an issue with accessing or
            interacting with the database */
          return done(err);
        }
        if (!user) {
          /* If there is no user in the database
            matching that email address */
          return done(null, false, {
            message:
              "Either your email or password is incorrect. Please recheck your credentials and try again.",
          });
        }
        bcrypt.compare(password, user.password, (err, response) => {
          /* If there was an error with bcryptJS */
          if (err) throw err;
          /* If the password does not match with
          the password in the database */
          if (!response) {
            return done(null, false, {
              message:
                "Either your email or password is incorrect. Please recheck your credentials and try again.",
            });
          }
          /* Else, the email and password must
          be correct. The user is authenticated. */
          return done(null, user);
        });
      });
    })
  );

  /* Upon first authentication (login), store
  the user's mongoDB id in the session. */
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  /* Upon subsequent interactions with our
  web application, we want to access the 
  user's whole object based on the information
  stored in the session. Thus, take the id,
  kept in the user's session and query the
  database for that id. Then we can access
  the user's whole object throughout the
  application through req.user. */
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  });
};
