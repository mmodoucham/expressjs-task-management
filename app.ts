const express = require("express");
require("dotenv").config();
import { Request, Response } from "express";

import { createTasksTable } from "./db";
import tasksRouter from "./src/routes/index";

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(express.json());

createTasksTable();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
