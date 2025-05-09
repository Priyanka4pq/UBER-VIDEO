const mongoose = require("mongoose");

// Define the schema for blacklisted tokens
const blacklistTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 }, // TTL of 24 hours (86400 seconds)
});

// Create the model
const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

module.exports = BlacklistToken;
