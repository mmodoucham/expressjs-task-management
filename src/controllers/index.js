const pool = require("../../db").pool;
const queries = require("../queries");

const getTasks = async (req, res) => {
  try {
    const tasksResult = await pool.query(queries.getTasks);
    const tasks = tasksResult.rows;
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const taskResult = await pool.query(queries.getTaskById, [id]);
    const task = taskResult.rows[0];
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, duedate } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Description must be a non-empty string" });
    }
    const parsedDueDate = new Date(duedate);
    if (isNaN(parsedDueDate.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid due date. Please provide a valid date" });
    }
    const taskResult = await pool.query(queries.createTask, [
      title,
      description,
      duedate,
    ]);
    const task = taskResult.rows[0];
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duedate } = req.body;

    const existingTaskResult = await pool.query(queries.getTaskById, [id]);
    const existingTask = existingTaskResult.rows[0];

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Description must be a non-empty string" });
    }
    const parsedDueDate = new Date(duedate);
    if (isNaN(parsedDueDate.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid due date. Please provide a valid date" });
    }
    const taskResult = await pool.query(queries.updateTask, [
      title,
      description,
      duedate,
      id,
    ]);
    const updatedTask = taskResult.rows[0];
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTask = await pool.query(queries.getTaskById, [id]);
    const taskToDelete = existingTask.rows[0];

    if (!taskToDelete) {
      return res.status(404).json({ error: "Task not found" });
    }

    const taskResult = await pool.query(queries.deleteTask, [id]);
    const deletedTask = taskResult.rows[0];
    res.status(204).json({ msg: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
