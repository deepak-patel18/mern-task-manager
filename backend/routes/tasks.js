const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// ----------------------
// GET ALL TASKS
// ----------------------
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// ----------------------
// CREATE TASK
// ----------------------
router.post("/", auth, async (req, res) => {
  try {
    const { title, priority } = req.body;

    const task = new Task({
      title,
      priority,
      userId: req.user.id,
    });

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Create task error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// UPDATE TASK
// ----------------------
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// DELETE TASK
// ----------------------
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------
// MARK TASK AS COMPLETED
// ----------------------
router.put("/complete/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { completed: true },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Complete task error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
