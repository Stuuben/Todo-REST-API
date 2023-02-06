const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createNewTask,
  getTaskById,
} = require("../controllers/taskController");

router.get("/", getAllTasks);

router.get("/:taskId", getTaskById);

router.post("/", createNewTask);

module.exports = router;
