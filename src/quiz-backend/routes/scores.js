const express = require("express");
const router = express.Router();
const Score = require("../models/Score");

// Save a student's score
router.post("/", async (req, res) => {
  try {
    const { name, department, score } = req.body;
    if (!name || !department || !score) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newScore = new Score({ name, department, score });
    await newScore.save();
    res.status(201).json({ message: "Score saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save score" });
  }
});

// Get all student scores
router.get("/", async (req, res) => {
  try {
    const scores = await Score.find();
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scores" });
  }
});
// Delete a student's score
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedScore = await Score.findByIdAndDelete(id);

    if (!deletedScore) {
      return res.status(404).json({ error: "Score not found" });
    }

    res.status(200).json({ message: "Score deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete score" });
  }
});

module.exports = router;
