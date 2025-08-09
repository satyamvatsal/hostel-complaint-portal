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
  const filter = {
    user: req.user.id,
  };
  if (status != true) {
    const data = await renderHomePage(
      req,
      res,
      { message: "Error while adding complaint" },
      filter,
    );
    res.render("myComplaints", data);
  }
  const data = await renderHomePage(
    req,
    res,
    { message: "Complaint registered successfully" },
    filter,
  );
  res.render("myComplaints", data);
});

router.get("/add", (req, res) => {
  res.render("addComplaint");
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
    const complaintId = req.params.id;
    console.log(complaintId);
    const complaint = await Complaint.findOne({
      user: user.id,
      _id: complaintId,
    });
    if (!complaint) {
      return res.redirect("/user/home");
    }
    complaint.status = "resolved";
    await complaint.save();
    const msg = {
      message: "Complaint resolved successfully.",
    };
    const filter = {
      hostel_no: req.user.hostel_no,
      user: req.used.id,
    };
    const data = await renderHomePage(req, res, msg, filter);
    res.render("myComplaints", data);
  } catch (err) {
    console.log("errror while resolving complaint,", err);
    return res.redirect("/user/home");
  }
});

module.exports = router;
