const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  return res.status(200).json({ message: "account created" });
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
