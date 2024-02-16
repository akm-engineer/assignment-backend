const Task = require("../model/taskModel");

// Tasks stored in memory
let tasks = [];

// GET /tasks
function getTasks(req, res) {
  res.status(200).json(tasks);
}

// GET /tasks/:id
function getTaskById(req, res) {
  const id = req.params.id;
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json(task);
}

// POST /tasks
function createTask(req, res) {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }
  const newTask = new Task(Date.now().toString(), title, description);
  tasks.push(newTask);
  res.status(201).json(newTask);
}

// PUT /tasks/:id
function updateTask(req, res) {
  const id = req.params.id;
  const { title, description } = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }
  tasks[taskIndex] = { id, title, description };
  res.status(200).json(tasks[taskIndex]);
}

// DELETE /tasks/:id
function deleteTask(req, res) {
  const id = req.params.id;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Task deleted successfully" });
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
