const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

/* Set the root directory for static files 
(.css, media files) to '/views'.
.ejs files are served from the "views" directory
as well. These are independent from our static
files and will be served from "/views" by default.
Note: .ejs files are not affected by the static 
directory change. */
app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
