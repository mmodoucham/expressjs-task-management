export const getTasksQuery: string = "SELECT * FROM tasks";
export const getTaskByIdQuery: string = "SELECT * FROM tasks WHERE id = $1";
export const createTaskQuery: string =
  "INSERT INTO tasks (title, description, duedate) VALUES ($1, $2, $3) RETURNING *";
export const updateTaskQuery: string =
  "UPDATE tasks SET title = $1, description = $2, duedate = $3 WHERE id = $4 RETURNING *";
export const deleteTaskQuery: string = "DELETE FROM tasks WHERE id = $1";
