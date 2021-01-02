/* == Auth Guard == */
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      /* Call the next middleware function if the
      user is authenticated. */
      return next();
    }
    /* User is not authenticated. Redirect user to login page. */
    req.flash("error_msg", "Please log in to view this resource.");
    res.redirect("/users/login");
  },
  alreadyAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      /* If the user is already authenticated, we want to restrict
      access to the route this middleware is setup for. (in this
      case we don't want the user to access /users/login if they
      are  already logged in. Thus, we send the user back to /dashboard
      if they are already logged in.) */
      res.redirect("/dashboard");
    } else {
      return next();
    }
  },
};
