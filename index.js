const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.get("/register", (req, res) => {
  res.render("register");
});

const port = 1080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
