const express = require("express");
const renderHomePage = require("../utils/renderHomePage");
const router = express.Router();
const loginAdminUser = require("../controllers/loginAdminUser");
const authMiddleware = require("../middleware/auth");
const Complaint = require("../models/Complaint");
const authMiddlewareAdmin = require("../middleware/authAdmin");

router.get("/login", (req, res) => {
  res.render("adminLogin");
});

router.post("/login", async (req, res) => {
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
      message: "Incorrect login credentials",
    };
    res.render("adminLogin", data);
  }
});

router.get("/home", authMiddlewareAdmin, async (req, res) => {
  const filter = {
    hostel_no: req.user.hostel_no,
  };
  const data = await renderHomePage(req, res, {}, filter);
  res.render("adminHome", data);
});

router.post("/resolve/:id", authMiddlewareAdmin, async (req, res) => {
  try {
    const user = req.user;
    const complaintId = req.params.id;
    const complaint = await Complaint.findOne({
      _id: complaintId,
    });
    if (!complaint) {
      return res.redirect("/admin/home");
    }
    complaint.status = "resolved";
    await complaint.save();
    const msg = {
      message: "Complaint resolved successfully.",
    };
    const filter = {
      hostel_no: req.user.hostel_no,
    };
    const data = await renderHomePage(req, res, msg, filter);
    res.render("adminHome", data);
  } catch (err) {
    console.log("error while resolving complaint,", err);
    return res.redirect("/admin/home");
  }
});

router.all("/{*splat}", (req, res) => {
  res.redirect("/admin/login");
});

module.exports = router;
