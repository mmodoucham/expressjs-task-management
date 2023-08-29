const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

async function createTasksTable() {
  try {
    const checkTableQuery = `
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = 'tasks'
            )
        `;

    const result = await pool.query(checkTableQuery);
    const tableExists = result.rows[0].exists;

    if (tableExists) {
      console.log("Tasks table already exists");
    } else {
      const createTableQuery = `
                CREATE TABLE tasks (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    duedate DATE NOT NULL
                )
            `;
      await pool.query(createTableQuery);
      console.log("Tasks table created");
    }
  } catch (error) {
    console.error("Error checking/creating tasks table:", error);
  }
}

module.exports = {
  pool,
  createTasksTable,
};
