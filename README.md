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

Before proceeding, make sure you have PostgreSQL installed and all packages installed.

Open the `db.js` file in your project. This file contains the configuration for connecting to the PostgreSQL database.

```javascript
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
```

- Set up your environment variables by creating a .env file in your project directory if you don't have one.
- Update the `.env `file with the following values:

```env
# Node environment
NODE_ENV=development

# The port your application will run on
PORT=3000  # Replace with your desired port number

# PostgresDB configuration
DB_HOST=localhost  # Replace with your PostgreSQL host
DB_USER=your_username  # Replace with your PostgreSQL username
DB_PASS=your_password  # Replace with your PostgreSQL password
DB_NAME=your_database  # Replace with the name of your PostgreSQL database
DB_PORT=5432  # Replace with the port your PostgreSQL is running on

#Docker configuration
DOCKER_DB_HOST=your_docker_db_host
```

- Replace the placeholders (`your_username`, `your_password`, `your_database`, `your_docker_db_host`, etc.) with your actual PostgreSQL and application-specific values.
- Adjust any other settings according to your specific configuration.

## API Endpoints

**Run the API:**
To run the API, use the following command:

```bash
npm run dev
```

The API will be accesible on **`http://localhost:3000`**.

To test the server, you can query http://localhost:3000/api/health using Postman or just copy it in the address bar in your browser. If the server is running, you should receive `"API is up and running"` as response.

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

## Unit & e2e testing with Jest

Two test suites were written. One for end-to-end testing and another for unit testing the controller functions.
Please note the following before running the tests.
**Note:**

- Please make sure the app is not running before runnign the tests.
- Please edit the file `src/tests/e2e/e2e.test.ts` Line 10 to select the ID of the test to be updated and deleted to avoid flakiness.

```javascript
  const testTaskID = //ID here;
```

- Please make sure there are couple of items available on the database before running the tests suite.

**Running both Test Suites**
Use the command below to run both the e2e and unit tests suites at once

```bash
npm run test
```

**Running e2e Test Suite**
Use the command below to run the e2e test suite only.

```bash
npm run test:e2e
```

**Running the unit test Suite**
Use the command below to run the unit test suite only.

```bash
npm run test:unit
```

## Building and Testing the API with Docker Compose

Docker Compose is a tool that enables you to define and manage multi-container Docker applications. In your case, you already have Dockerfile configurations and a `docker-compose.yml` file to streamline the process.

1. **Install Docker Compose:**
   If you don't have Docker Compose installed, you can follow the installation instructions provided on the [Docker Compose website](https://docs.docker.com/compose/install/).

2. **Navigate to Project Directory:**
   Open a terminal and navigate to the base directory containing the `Dockerfile` and `docker-compose.yml`.

3. **Build and Start Containers:**
   Run the following command to build and start the containers defined in the `docker-compose.yml` file:

   ```sh
   docker-compose up --build
   ```

4. **Access the API:**  
   Once the containers are up and running, your API should be accessible through a web browser or API client at the specified port, which is likely the same as what's defined in your `.env` file.
5. **Stopping the Containers:**
   When you're finished testing, you can stop the containers gracefully by returning to the terminal and pressing `Ctrl+C`
6. **Cleaning Up:**
   To remove the containers and clean up resources, run the following command:

```sh
docker-compose down
```

- This command will stop and remove the containers, networks, and volumes defined in your docker-compose.yml file.
