const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  score: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Score", scoreSchema);
