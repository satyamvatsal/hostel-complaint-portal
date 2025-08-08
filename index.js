const connectDB = require("./db/db");
const express = require("express");
const app = express();
require("dotenv").config({ path: ".env.local" });

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));

connectDB();

app.get("/register", (req, res) => {
  res.render("register");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
