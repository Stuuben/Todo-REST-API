const mongoose = require("mongoose");
const TaskSchema = require("../models/Tasks");

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 300,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
});

module.exports = mongoose.model("Todo", TodoSchema);
