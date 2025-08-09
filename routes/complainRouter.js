const express = require("express");
const addComplaint = require("../controllers/addComplaint");
const Complaint = require("../models/Complaint");
const renderHomePage = require("../utils/renderHomePage");

const router = express.Router();
router.post("/add", async (req, res) => {
  const complain = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
  };
  const status = await addComplaint(req.user, complain);
  const complaints = await Complaint.find({
    hostel_no: req.user.hostel_no,
    status: "not resolved",
  }).sort({ createdAt: -1 });

  const data = {
    user: req.user,
    complaints,
    message: "Complaint added successfully",
  };
  res.render("home", data);
});

router.get("/recent", async (req, res) => {
  const user = req.user;
  const complaints = await Complaint.find({ user: user.id });
  const data = {
    user,
    complaints,
    myComplaints: false,
  };
  res.render("home", data);
});
router.get("/myComplaints", async (req, res) => {
  const user = req.user;
  const complaints = await Complaint.find({ user: user.id });
  const filter = {
    user: req.user.id,
  };
  const data = await renderHomePage(req, res, {}, filter);
  res.render("myComplaints", data);
});

router.post("/resolve/:id", async (req, res) => {
  try {
    const user = req.user;
    const complaint = await Complaint.findOne({ user: user.id });
    if (!complaint) {
      res.redirect("/user/home");
    }
    complaint.status = "resolved";
    await complaint.save();
    const data = {
      message: "Complaint resolved successfully.",
    };
    const filter = {
      hostel_no: req.user.hostel_no,
      status: "not resolved",
    };
    await renderHomePage(req, res, data, filter);
  } catch (err) {
    console.log("errror while resolving complaint,", err);
    res.redirect("/user/home");
  }
});

module.exports = router;
