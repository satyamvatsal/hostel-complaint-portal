const Complaint = require("../models/Complaint");

async function renderHomePage(req, res, extraData = {}, filter = {}) {
  const complaints = await Complaint.find(filter).sort({ createdAt: -1 });

  const data = {
    user: req.user,
    complaints,
    ...extraData,
  };
  console.log(data);
  res.render("home", data);
}

module.exports = renderHomePage;
