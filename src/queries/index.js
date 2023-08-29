const getTasks = "SELECT * FROM tasks";
const getTaskById = "SELECT * FROM tasks WHERE id = $1";
const createTask =
  "INSERT INTO tasks (title, description, duedate) VALUES ($1, $2, $3) RETURNING *";
const updateTask =
  "UPDATE tasks SET title = $1, description = $2, duedate = $3 WHERE id = $4 RETURNING *";
const deleteTask = "DELETE FROM tasks WHERE id = $1";

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
