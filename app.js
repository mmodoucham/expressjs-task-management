const express = require("express");
const { pool, createTasksTable } = require("./db");
const tasksRouter = require("./src/routes/index");
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Create the tasks table if it doesn't exist
createTasksTable();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/tasks", tasksRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
