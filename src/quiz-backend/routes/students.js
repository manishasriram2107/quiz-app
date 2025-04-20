const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Add a new student
router.post("/", async (req, res) => {
  try {
    const { name, department, email } = req.body;
    const student = new Student({
      name,
      department,
      email,
      createdAt: new Date(),
    });
    await student.save();
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
