const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const mongodbURI = process.env.MONGODB_URI;
const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

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
/* == setup static file service + form
 body-parser middleware == */
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: false }));

/* == setup view engine ==  */
app.set("view engine", "ejs");
app.use(expressLayouts);

/* == setup routes == */
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

/* == launch server == */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
