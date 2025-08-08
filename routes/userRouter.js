const express = require("express");
const router = express.Router();
const User = require("../models/User");
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/loginUser");

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const status = await registerUser(req.body);
    if (status != true) {
      throw new Error("user registration failed");
    }
    const data = {
      message: "Please login now.",
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

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const status = await loginUser(req.body);
    if (status != true) {
      throw new Error("user login failed");
    }
    res.render("home", data);
  } catch (err) {
    const data = {
      message: `Login error: ${err.message}`,
    };
    console.error("login error: ", err);
    res.render("login", data);
  }
});

router.get("/home", (req, res) => {
  const data = {};
  res.render("home", data);
});
module.exports = router;
