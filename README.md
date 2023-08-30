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
    "duedate": "2019-08-24T14:15:22Z"
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
  "duedate": "2019-08-24T14:15:22Z"
}
```

- **Response:**

```json
{
  "id": 5,
  "title": "New Task",
  "description": "A new task",
  "duedate": "2019-08-24T14:15:22Z"
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
  "duedate": "2019-08-24T14:15:22Z"
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
  "duedate": "2019-08-24T14:15:22Z"
}
```

- **Response:**

```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "An updated task",
  "duedate": "2019-08-24T14:15:22Z"
}
```

### Delete Task

- **Endpoint:** **`/tasks/`**
- **Method:** DELETE

## Testing API Endpoints using Swagger UI

Swagger UI provides an interactive interface for testing and exploring your API endpoints. Follow the steps below to use Swagger UI and test the endpoints of the Task Management API.

1. **Access Swagger Documentation:**
   Open your web browser and navigate to the Swagger UI documentation page. Typically, you can access Swagger UI by appending `/docs` to the base URL of your application. Replace `http://localhost:3000` with your actual base URL.
2. **Testing Endpoints**

- Click on the endpoint you want to test. This will expand the endpoint - details and reveal the **_"Try it out"_** button.
- Click the "Try it out" button next to the endpoint you selected.
- If the endpoint requires any input parameters, provide the necessary values in the input fields provided.
- Click the **_"Execute"_** button to send the API request.
- You can do this for all available endpoints
- If you want to modify the input parameters for an endpoint, simply update the values in the **_"Parameters"_** section and click **_"Execute"_** again.

3. **View Responses:**

- Once you execute the request, Swagger UI will display the response from the API, including the status code, response headers, and response body.
- If the response includes a JSON body, you'll see it formatted for easy reading.

4. **Errors and Troubleshooting:**

- If the API request results in an error, Swagger UI will display the error details, including the status code and error message.
- Carefully review the error message to troubleshoot and make necessary

## Testing API Endpoints Using Postman

Apart from using Swagger UI, you can also use Postman to test your Task Management App API endpoints. Here's how you can import the Swagger documentation into Postman for testing:

1. **Import SwaggerJSON:**

Open Postman and follow these steps:

- Navigate to _`File>Import`_
- Paste the swaggerdocs uri in the import field. By default the URL is:

```bash
http://localhost:3000/docs.json
```

- Click Import button

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
