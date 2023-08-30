require("dotenv").config();
import { Pool } from "pg";

const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT as string, 10),
});

async function createTasksTable(): Promise<void> {
  try {
    const checkTableQuery: string = `
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = 'tasks'
            )
        `;

    const result = await pool.query(checkTableQuery);
    const tableExists: boolean = result.rows[0].exists;

    if (tableExists) {
      console.log("Tasks table already exists");
    } else {
      const createTableQuery: string = `
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
    console.log("Error checking/creating tasks table:", error);
  }
}

export { pool, createTasksTable };
