const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createNewTodo,
  updateTodoById,
  deleteTodoById,
  addTask,
} = require("../controllers/todoController");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");

router.get("/", isAuthenticated, getAllTodos);

router.get("/:todoId", isAuthenticated, getTodoById);

router.post("/", isAuthenticated, createNewTodo);

router.post("/:todoId/:taskId", isAuthenticated, addTask);

router.put("/:todoId", isAuthenticated, updateTodoById);

router.delete("/:todoId", isAuthenticated, deleteTodoById);

module.exports = router;
