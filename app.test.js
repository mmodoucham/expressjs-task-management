const request = require("supertest");
const app = require("./app");

describe("General Tests", () => {
  const testTask = {
    title: "Test Task",
    description: "This is a test task",
    duedate: "2019-08-22",
  };
  const testTaskID = 1;
  test("Request for all tasks", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.statusCode).toBe(200);
  });
  test("Request for a single task", async () => {
    const response = await request(app).get(`/api/tasks/${testTaskID}`);
    expect(response.statusCode).toBe(200);
  });
  test("Request for a non-existent task", async () => {
    const response = await request(app).get("/api/tasks/100");
    expect(response.statusCode).toBe(404);
  });
  test("Create a task", async () => {
    const response = await request(app).post("/api/tasks").send(testTask);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toEqual(testTask.title);
    expect(response.body.description).toEqual(testTask.description);
  });
  test("Update a task", async () => {
    const response = await request(app)
      .put(`/api/tasks/${testTaskID}`)
      .send(testTask);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toEqual(testTask.title);
    expect(response.body.description).toEqual(testTask.description);
  });
  test("Delete a task", async () => {
    const response = await request(app).delete(`/api/tasks/${testTaskID}`);
    expect(response.statusCode).toBe(204);
  });
  test("Update a non-existent task", async () => {
    const response = await request(app).put(`/api/tasks/100`).send(testTask);
    expect(response.statusCode).toBe(404);
  });
  test("Delete a non-existent task", async () => {
    const response = await request(app).delete(`/api/tasks/100`);
    expect(response.statusCode).toBe(404);
  });
});
