const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const app = express();

/* == Run passport configuration function == */
require("./config/passport.js")(passport);

/* == Declare mongoDB options == */
const mongodbURI = process.env.MONGODB_URI;
const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

/* == Connect to mongoDB using mongoose == */
mongoose
  .connect(mongodbURI, connectionOptions)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

/* Set the root directory for static files 
(.css, media files) to '/views'.
.ejs files are served from the "views" directory
as well. These are independent from our static
files and will be served from "/views" by default.
Note: .ejs files are not affected by the static 
directory change. */
/* == setup static file service == */
app.use(express.static(__dirname + "/views"));

/* == setup view engine ==  */
app.set("view engine", "ejs");
app.use(expressLayouts);

/* == setup express session == */
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

/* == setup form body-parser middleware == */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* == setup passport middleware == */
app.use(passport.initialize());
app.use(passport.session());

/* == setup connect-flash middleware == */
app.use(flash());

/* == setup response variables [custom middleware
to prevent us from having to pass in flash variables
manually through the .render() method]  == */
app.use((req, res, next) => {
  /* set the response variable "success_msg", available
  in the view to the value of req.flash("success_msg")
  which we set before our redirect. */
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  /* req.flash("error") will be populated through the option
  "failureFlash" in passport.authenticate() */
  next();
})

/* == setup routes == */
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
app.use("/api", require("./routes/api.js"));

/* == launch server == */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
