const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  let dbStatus = "disconnected";

  dbStatus = mongoose.connection.readyState;
  if (dbStatus !== "connected") {
    return res.status(503).json({
      status: "MongoDB down",
      uptime: process.uptime(),
      timestamp: new Date(),
      database: dbStatus,
    });
  }
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
    database: dbStatus,
  });
});

module.exports = router;
