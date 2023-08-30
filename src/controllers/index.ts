import { Request, Response } from "express";
import { Pool } from "pg";
import {
  getTasksQuery,
  getTaskByIdQuery,
  createTaskQuery,
  updateTaskQuery,
  deleteTaskQuery,
} from "../queries";

const pool: Pool = require("../db/index").pool;

const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasksResult = await pool.query(getTasksQuery);
    const tasks = tasksResult.rows;
    res.json(tasks);
  } catch (error) {
    console.log("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const taskResult = await pool.query(getTaskByIdQuery, [id]);
    const task = taskResult.rows[0];
    if (!task) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    console.log("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, duedate } = req.body;
    if (!title || title.trim() === "") {
      res.status(400).json({ error: "Title cannot be empty" });
      return;
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      res.status(400).json({ error: "Description must be a non-empty string" });
      return;
    }
    const parsedDueDate = new Date(duedate);
    if (isNaN(parsedDueDate.getTime())) {
      res
        .status(400)
        .json({ error: "Invalid due date. Please provide a valid date" });
      return;
    }
    const taskResult = await pool.query(createTaskQuery, [
      title,
      description,
      duedate,
    ]);
    const task = taskResult.rows[0];
    res.status(201).json(task);
  } catch (error) {
    console.log("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, duedate } = req.body;

    const existingTaskResult = await pool.query(getTaskByIdQuery, [id]);
    const existingTask = existingTaskResult.rows[0];

    if (!existingTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    if (!title || title.trim() === "") {
      res.status(400).json({ error: "Title cannot be empty" });
      return;
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      res.status(400).json({ error: "Description must be a non-empty string" });
      return;
    }
    const parsedDueDate = new Date(duedate);
    if (isNaN(parsedDueDate.getTime())) {
      res
        .status(400)
        .json({ error: "Invalid due date. Please provide a valid date" });
      return;
    }
    const taskResult = await pool.query(updateTaskQuery, [
      title,
      description,
      duedate,
      id,
    ]);
    const updatedTask = taskResult.rows[0];
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingTask = await pool.query(getTaskByIdQuery, [id]);
    const taskToDelete = existingTask.rows[0];

    if (!taskToDelete) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    const taskResult = await pool.query(deleteTaskQuery, [id]);
    const deletedTask = taskResult.rows[0];
    res.status(204).json({ msg: "Task deleted" });
  } catch (error) {
    console.log("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
