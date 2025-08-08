const express = require("express");
const router = express.Router();
const User = require("../models/User");
const registerUser = require("../controllers/registerUser");

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const status = await registerUser(req.body);
    const data = {
      message: "registered successfully. please login",
    };
    res.render("login", data);
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
  const data = {
    message: "user already exists",
  };
  res.render("login", data);
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.redirect("/user/home");
});

router.get("/home", (req, res) => {
  const data = {};
  res.render("home", data);
});
module.exports = router;
