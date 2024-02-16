const express = require("express");
const bodyParser = require("body-parser");
const taskController = require("./controllers/taskController.js");
const authMiddleware = require("./middlewares/authMiddleware.js");

const app = express();
app.use(bodyParser.json());

// Routes with authentication and authorization middleware
app.get("/tasks", authMiddleware.authenticate, taskController.getTasks);
app.get("/tasks/:id", authMiddleware.authenticate, taskController.getTaskById);
app.post("/tasks", authMiddleware.authenticate, taskController.createTask);
app.put(
  "/tasks/:id",
  authMiddleware.authenticate,
  authMiddleware.authorize,
  taskController.updateTask
);
app.delete(
  "/tasks/:id",
  authMiddleware.authenticate,
  authMiddleware.authorize,
  taskController.deleteTask
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
