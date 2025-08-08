const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env.local" });

const MONGO_URL = process.env.MONGO_URI;

const connectDB = async () => {
  const db = await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Failed to connect to mongodb, ", err));
};

module.exports = connectDB;
