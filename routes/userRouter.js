const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const data = {
      message: "User created",
    };
    res.render("register", data);
  } catch (err) {
    console.log("error while registering user, ", err);
    const data = {
      error: `cannot create user: ${err.message}`,
    };
    res.render("register", data);
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.redirect("/user/home");
});

module.exports = router;
