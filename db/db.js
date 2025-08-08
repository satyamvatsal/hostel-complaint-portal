const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env.local" });

const MONGO_URL = process.env.MONGO_URI;

if (!MONGO_URL) {
  throw new Error("MONGO_URI not defined in environment variables");
}

let client;
let db;

async function connectDB() {
  if (db) return db;
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db;
    console.log("MongoDB connected");
    return db;
  } catch (err) {
    console.error("Mongodb connection error: ", err);
    throw err;
  }
}

function getDB() {
  if (!db) {
    throw new Error("Call connectDB() before using getDB()");
  }
  return db;
}

function getClient() {
  if (!client) {
    throw new Error("Call connectDB() before using getClient()");
  }
  return client;
}

module.exports = { connectDB, getDB, getClient };
