const Tasks = require("../models/Tasks");
const Todos = require("../models/Todos");
const { notFoundError, BadRequestError } = require("../utils/error");

exports.getAllTasks = async (req, res) => {
  try {
    const limit = Number(req.query?.limit || 10);

    const offset = Number(req.query?.offset || 0);

    // Get all projects; filter according to "limit" and "offset" query params
    const tasks = await Tasks.find().limit(limit).skip(offset);
    // Get total number of projects available in database
    const totalTasksInDatabase = await Tasks.countDocuments();
    // Create and send our response
    return res.json({
      data: tasks, // Send projects result
      meta: {
        // meta information about request
        total: totalTasksInDatabase, // Total num projects available in db
        limit: limit, // Num of projects asked for
        offset: offset, // Num or projects asked to skip
        count: tasks.length, // Num of projects sent back
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

exports.getTaskById = async (req, res) => {
  const taskId = req.params.taskId;

  const task = await Tasks.findById(taskId);

  if (!task) throw new notFoundError("This Task does not exist silly goose!");

  return res.json(task);
};

exports.createNewTaskToTodo = async (req, res) => {
  const todoId = req.params.todoId;
  const task = new Tasks({
    name: "New task",
    description: "Description of the new task",
  });

  task.save((error, task) => {
    if (error) {
      // Handle error
    }

    // Add the Task document's _id to the Todo document's tasks array
    Todos.findByIdAndUpdate(
      todoId,
      { $push: { tasks: task._id } },
      { new: true },
      (error, todo) => {
        if (error) {
          // Handle error
        }

        // `todo` now contains the updated Todo document with the new Task document's _id added to its tasks array
      }
    );
  });

  /*   const title = req.body.name || "";
  const description = req.body.description || "";

  if (!title) throw new BadRequestError("You must porvide a name stooopid");

  const newTasks = await Tasks.create({
    title: title,
    description: description,
  });
  return res
    .setHeader(
      "Location",
      `http://localhost:${process.env.PORT}/api/v1/tasks/${newTasks._id}/`
    )
    .status(201)
    .json(newTasks); */
};
