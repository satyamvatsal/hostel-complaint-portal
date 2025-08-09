const Complaint = require("../models/Complaint");

const addComplaint = async (user, complain) => {
  console.log(user, complain);
  const newComplain = new Complaint({
    title: complain.title,
    description: complain.description,
    category: complain.category,
    user: user.id,
    hostel_no: user.hostel_no,
  });
  await newComplain.save();
  console.log("Complaint saved");
  return true;
};

module.exports = addComplaint;
