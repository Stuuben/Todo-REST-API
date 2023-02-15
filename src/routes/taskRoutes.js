const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createNewTask,
  getTaskById,
} = require("../controllers/taskController");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");

router.get("/", isAuthenticated, getAllTasks);

router.get("/:taskId", isAuthenticated, getTaskById);

router.post("/", isAuthenticated, createNewTask);

module.exports = router;
