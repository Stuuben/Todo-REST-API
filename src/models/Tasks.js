const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  description: {
    type: String,
    maxLength: 300,
  },
  priority: {
    type: String,
    enum: ["HIGH", "LOW", "MEDIUM"],
    default: "LOW",
    uppercase: true,
  },
  status: {
    type: String,
    enum: ["DONE", "ONGOING", "NEW"],
    uppercase: true,
    default: "NEW",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
