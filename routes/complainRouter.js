const express = require("express");
const addComplaint = require("../controllers/addComplaint");
const Complaint = require("../models/Complaint");

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
  const data = {
    user,
    complaints,
    myComplaints: true,
  };
  console.log(data);
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
    res.redirect("/user/home");
  } catch (err) {
    console.log("errror while resolving complaint,", err);
    res.redirect("/user/home");
  }
});

module.exports = router;
