const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["water", "internet", "mess", "electricity", "washroom", "general"],
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
