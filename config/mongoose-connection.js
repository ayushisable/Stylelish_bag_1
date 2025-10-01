const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

// Get MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined. Please set it in Render Environment Variables.");
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  dbgr("✅ MongoDB connected successfully");
})
.catch((err) => {
  dbgr("❌ MongoDB connection error:", err);
});

module.exports = mongoose.connection;
