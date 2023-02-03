const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createNewTaskToTodo,
} = require("../controllers/taskController");

router.get("/", getAllTasks);

router.post("/:todoId", createNewTaskToTodo);

module.exports = router;
