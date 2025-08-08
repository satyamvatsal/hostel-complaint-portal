const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env.local" });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI not found in env");
}

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error, ", err);
  }
}
module.exports = { connectDB };
