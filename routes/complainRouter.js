const express = require("express");
const addComplaint = require("../controllers/addComplaint");

const router = express.Router();
router.post("/add", async (req, res) => {
  const complain = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
  };
  const status = await addComplaint(req.user, complain);
  const data = {
    message: "Complaint added successfully",
  };
  res.render("home", data);
});

router.get("/recent", (req, res) => {
  const data = {};
});

module.exports = router;
