# Task Management App Documentation

This repository contains a Task Management App API built using ExpressJS and postgresql as the database. The API provides endpoints to manage tasks including creating, retrieving, updating, and deleting tasks.

## Project Requirements

- Nodejs
- ExpressJS
- PostgreSQL

## Project Setup

1. **Clone the Repository:**
   Clone this repository to your local machine using the following command:

```bash
    git clone https://github.com/mmodoucham/expressjs-task-management.git
```

2. **Install Dependencies:**
   Navigate to the project directory and install the required dependencies using npm:

```bash
cd expressjs-api-task-management/
npm install
```

## Setting Up the Database for Your API

Before proceeding, make sure you have PostgreSQL installed and all packages installed

Open the `db.js` file in your project. This file contains the configuration for connecting to the PostgreSQL database.

```javascript
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});
```

- Replace `"postgres"` with your PostgreSQL username.
- Replace `"localhost"` with the hostname of your PostgreSQL server.
- Replace `"postgres"` with the name of the database you want to use.
- Update `"postgres"` with your PostgreSQL password.
- Adjust the port if your PostgreSQL server is running on a different port.

## API Endpoints

**Run the API:**
To run the API, use the following command:

```bash
nodemon app.js
```

The API will be accesible on **`http://localhost:3000`**.

### Get All Tasks

- **Endpoint:** **`/tasks/`**
- **Method:** GET
- **Response:**

```json
[
  {
    "id": 1,
    "title": "Sample Task",
    "description": "This is a sample task",
    "dueDate": "2019-08-24T14:15:22Z"
  }
  // ... other tasks
]
```

### Create Task

- **Endpoint:** **`/api/tasks/`**
- **Method:** POST
- **Request:**

```json
{
  "title": "New Task",
  "description": "A new task",
  "dueDate": "2019-08-24T14:15:22Z"
}
```

- **Response:**

```json
{
  "id": 5,
  "title": "New Task",
  "description": "A new task",
  "dueDate": "2019-08-24T14:15:22Z"
}
```

### Get Task by ID

- **Endpoint:** **`/api/tasks/{task_id}`**
- **Method:** GET
- **Response:**

```json
{
  "id": 1,
  "title": "Sample Task",
  "description": "This is a sample task",
  "dueDate": "2019-08-24T14:15:22Z"
}
```

### Update Task

- **Endpoint:** **`/tasks/`**
- **Method:**
- **Request:**

```json
{
  "title": "Updated Task",
  "description": "An updated task",
  "dueDate": "2019-08-24T14:15:22Z"
}
```

- **Response:**

```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "An updated task",
  "dueDate": "2019-08-24T14:15:22Z"
}
```

### Delete Task

- **Endpoint:** **`/tasks/`**
- **Method:** DELETE

## Testing the API using JEST & supertest

Test for the endpoints were written in JEST and supertest
To run the test cases, Use the following command:

```bash
npm run test
```

**Note:**

- Please make sure the app is not running before runnign the tests.
- Please edit the file `app.test.js` Line 10 to select the ID of the test to be updated and deleted to avoid flakiness.

```javascript
  const testTaskID = //ID here;
```

- Please make sure there are couple of items available on the database before running the tests suite
