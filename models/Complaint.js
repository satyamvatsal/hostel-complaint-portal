const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["water", "network", "mess", "electricity", "washroom", "general"],
    required: true,
  },
  title: {
    type: String,
    trim: true,
  },
  hostel_no: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["resolved", "not resolved"],
    default: "not resolved",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: {
    type: Date,
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

complaintSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status === "resolved") {
    this.resolvedAt = new Date();
  }
  next();
});

module.exports = mongoose.model("Complaint", complaintSchema);
