const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => {
  console.log(req.body);
  const data = {
    message: "Complaint added successfully",
  };
  res.render("home", data);
});
