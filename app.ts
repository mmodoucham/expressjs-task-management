const express = require("express");
require("dotenv").config();
import { Request, Response } from "express";

import { createTasksTable } from "./db";
import tasksRouter from "./src/routes/index";
import swaggerSetup from "./src/utils/swagger";

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(express.json());

createTasksTable();

app.get("/", (req: Request, res: Response) => {
  res.send({
    message:
      "Oh, congratulations!  I'm sure you were expecting a grand treasure trove of data, but alas, you're in the wrong place. How about you make your way to /docs instead? There, you might actually find something useful. Maybe. 🙃",
  });
});

/**
 * @swagger
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the API is up and running
 *     responses:
 *       200:
 *         description: API is up and running
 */
app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).send("API is up and running");
});

app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  swaggerSetup(app, PORT);
});

export default app;
