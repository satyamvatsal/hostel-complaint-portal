const express = require("express");
const renderHomePage = require("../utils/renderHomePage");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("adminLogin");
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const token = await loginAdminUser(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.redirect("/user/home");
  } catch (err) {
    console.error("error while admin login: ", err);
    res.render("home");
  }
});

router.get("/home", (req, res) => {
  const filter = {};
  const data = renderHomePage(req, res, {}, filter);
  res.render("adminHome");
});

module.exports = router;
