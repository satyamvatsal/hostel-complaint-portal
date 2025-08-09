const express = require("express");
const renderHomePage = require("../utils/renderHomePage");
const router = express.Router();
const loginAdminUser = require("../controllers/loginAdminUser");
const authMiddleare = require("../middleware/auth");

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
    res.redirect("/admin/home");
  } catch (err) {
    console.error("error while admin login: ", err);
    const data = {
      message: "error while login",
    };
    res.render("adminHome", data);
  }
});

router.get("/home", authMiddleare, (req, res) => {
  const filter = {
    hostel_no: req.user.hostel_no,
  };
  const data = renderHomePage(req, res, {}, filter);
  res.render("adminHome", data);
});

module.exports = router;
