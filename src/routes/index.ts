/**
 * @swagger
 * components:
 *   schemas:
 *     Tasks:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - duedate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: A brief description of the task
 *         duedate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *       example:
 *         id: 1
 *         title: A Sample Task
 *         description: Sample Description.
 *         duedate: 2024-08-24T14:15:22Z
 *     CreateTask:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - duedate
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: A brief description of the task
 *         duedate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *       example:
 *         title: A Sample Task
 *         description: Write a detailed proposal for the upcoming project.
 *         duedate: 2024-08-24T14:15:22Z
 */

import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/index";

const router = Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Lists all the tasks
 *     tags: [Tasks]
 *     responses:
 *       "200":
 *         description: The list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tasks'
 *       "500":
 *         description: Internal server error.
 */

router.get("/", getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Gets a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     responses:
 *       "200":
 *         description: The requested task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tasks'
 *       "404":
 *         description: Task not found.
 *       "500":
 *         description: Internal server error.
 */

router.get("/:id", getTaskById);
/**
 * @swagger
 * /api/tasks/:
 *   post:
 *     summary: Creates a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       "201":
 *         description: The created task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tasks'
 *       "400":
 *         description: Invalid request body.
 *       "500":
 *         description: Internal server error.
 */

router.post("/", createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Updates a task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       "200":
 *         description: Update was successful.
 *       "400":
 *         description: Invalid request body.
 *       "404":
 *         description: Task not found.
 *       "500":
 *         description: Internal server error.
 */

router.put("/:id", updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Deletes a task by id
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     responses:
 *       "204":
 *         description: Delete was successful.
 *       "404":
 *         description: Task not found.
 *       "500":
 *         description: Internal server error.
 */

router.delete("/:id", deleteTask);

export default router;
