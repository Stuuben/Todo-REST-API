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

router.get("/", getAllTodos);

router.get("/:todoId", getTodoById);

router.post("/", createNewTodo);

router.post("/:todoId/:taskId", addTask);

router.put("/:todoId", updateTodoById);

router.delete("/:todoId", deleteTodoById);

module.exports = router;
