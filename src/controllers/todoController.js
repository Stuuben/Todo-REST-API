const Tasks = require("../models/Tasks");
const Todo = require("../models/Todos");
const { notFoundError, BadRequestError } = require("../utils/error");

exports.getAllTodos = async (req, res) => {
  try {
    const limit = Number(req.query?.limit || 10);

    const offset = Number(req.query?.offset || 0);

    // Get all projects; filter according to "limit" and "offset" query params
    const todos = await Todo.find().limit(limit).skip(offset);
    // Get total number of projects available in database
    const totalTodosInDatabase = await Todo.countDocuments();
    // Create and send our response
    return res.json({
      data: todos, // Send projects result
      meta: {
        // meta information about request
        total: totalTodosInDatabase, // Total num projects available in db
        limit: limit, // Num of projects asked for
        offset: offset, // Num or projects asked to skip
        count: todos.length, // Num of projects sent back
      },
    });
    // Catch any unforseen errors
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTodoById = async (req, res) => {
  const todoId = req.params.todoId;

  const todo = await Todo.findById(todoId);

  if (!todo) throw new notFoundError("This Todo does not exist silly goose!");

  //
  Todo.findById(todoId)
    .populate("tasks")
    .exec((error, todo) => {
      if (error) {
        // Handle error
      }

      // `todo` now contains the Todo document along with its associated Task documents
    });
  //
  return res.json(todo);
};

exports.createNewTodo = async (req, res) => {
  const name = req.body.name || "";
  const description = req.body.description || "";

  if (!name) throw new BadRequestError("You must porvide a name stooopid");

  const newTodo = await Todo.create({
    name: name,
    description: description,
  });

  return res
    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/todos/${newTodo._id}`
    )
    .status(201)
    .json(newTodo);
};

exports.updateTodoById = async (req, res) => {
  const todoId = req.params.todoId;

  const { name, description } = req.body;

  if (!name || !description)
    throw new BadRequestError(
      "You need to have a name and description in order for this shit to work =)"
    );

  const todoToUpdate = await Todo.findById(todoId);

  if (!todoToUpdate)
    throw new notFoundError("This does not exist, not even in space");

  if (name) todoToUpdate.name = name;
  if (description) todoToUpdate.description = description;

  const updatedTodo = await todoToUpdate.save();

  return res.json(updatedTodo);
};

exports.deleteTodoById = async (req, res) => {
  const todoId = req.params.todoId;

  const todoToDelete = await Todo.findById(todoId);

  if (!todoToDelete) throw new notFoundError("IT DOSENT EXIST OK?!");

  await todoToDelete.delete();

  return res.sendStatus(204);
};

exports.addTask = async (req, res) => {
  console.log(req.params);
  const todoId = req.params.todoId;
  const todo = await Todo.findById(todoId);

  const taskId = req.params.taskId;
  const task = await Tasks.findById(taskId);

  if (!task) throw new notFoundError("Haha du skrev fel");

  todo.tasks.push(taskId);
  console.log(todo);

  await todo.save();

  return res.json(todo);
};
