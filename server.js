const express = require("express");
const path = require("path")
const router = express.Router();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
