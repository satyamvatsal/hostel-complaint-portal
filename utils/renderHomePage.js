const Complaint = require("../models/Complaint");

async function renderHomePage(req, res, extraData = {}, filter = {}) {
  const complaints = Complaint.find(filter).sort({ createdAt: -1 });

  const data = {
    user: req.user,
    complaints,
    ...extraData,
  };
  res.render("home", data);
}

module.exports = renderHomePage;
