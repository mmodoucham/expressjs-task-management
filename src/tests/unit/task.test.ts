import { Request, Response } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../../controllers";
import * as dbIndex from "../../db/index";

jest.mock("pg", () => {
  const mQuery = jest.fn();
  return {
    Pool: jest.fn(() => ({
      query: mQuery,
    })),
  };
});

let mockPoolQuery: jest.Mock;

beforeEach(() => {
  mockPoolQuery = jest.fn();
  dbIndex.pool.query = mockPoolQuery;
});

afterEach(() => {
  jest.clearAllMocks();
});

it("should get tasks", async () => {
  const mockTasks = [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      duedate: "2023-09-01",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      duedate: "2023-09-02",
    },
  ];
  mockPoolQuery.mockResolvedValueOnce({ rows: mockTasks });

  const mockRequest = {} as Request;
  const mockResponse = {
    json: jest.fn(),
  } as unknown as Response;

  await getTasks(mockRequest, mockResponse);

  expect(mockPoolQuery).toHaveBeenCalledWith(expect.any(String));
  expect(mockResponse.json).toHaveBeenCalledWith(mockTasks);
});

it("should get task by id", async () => {
  const mockTask = {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    duedate: "2023-09-01",
  };
  mockPoolQuery.mockResolvedValueOnce({ rows: [mockTask] });

  const mockRequest = { params: { id: "1" } } as unknown as Request;
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  await getTaskById(mockRequest, mockResponse);

  expect(mockPoolQuery).toHaveBeenCalledWith(expect.any(String), ["1"]);
  expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
});

it("should create task", async () => {
  const mockRequest = {
    body: {
      title: "New Task",
      description: "Description of the new task",
      duedate: "2023-09-01",
    },
  } as unknown as Request;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const mockCreatedTask = {
    id: 1,
    title: "New Task",
    description: "Description of the new task",
    duedate: "2023-09-01",
  };
  mockPoolQuery.mockResolvedValueOnce({ rows: [mockCreatedTask] });

  await createTask(mockRequest, mockResponse);

  expect(mockPoolQuery).toHaveBeenCalledWith(expect.any(String), [
    "New Task",
    "Description of the new task",
    "2023-09-01",
  ]);
  expect(mockResponse.status).toHaveBeenCalledWith(201);
  expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedTask);
});

it("should update task", async () => {
  const mockRequest = {
    params: { id: "1" },
    body: {
      title: "Updated Task",
      description: "Updated description",
      duedate: "2023-09-02",
    },
  } as unknown as Request;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const mockExistingTask = {
    id: 1,
    title: "Original Task",
    description: "Original description",
    duedate: "2023-09-01",
  };
  mockPoolQuery.mockResolvedValueOnce({ rows: [mockExistingTask] });

  const mockUpdatedTask = {
    id: 1,
    title: "Updated Task",
    description: "Updated description",
    duedate: "2023-09-02",
  };
  mockPoolQuery.mockResolvedValueOnce({ rows: [mockUpdatedTask] });

  await updateTask(mockRequest, mockResponse);

  expect(mockPoolQuery).toHaveBeenCalledWith(expect.any(String), ["1"]);
  expect(mockResponse.status).toHaveBeenCalledWith(200);
  expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedTask);
});

it("should delete task", async () => {
  const mockRequest = {
    params: { id: "1" },
  } as unknown as Request;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const mockExistingTask = {
    id: 1,
    title: "Task to Delete",
    description: "Description of the task to delete",
    duedate: "2023-09-01",
  };
  mockPoolQuery.mockResolvedValueOnce({ rows: [mockExistingTask] });

  const mockDeletedTask = {
    id: 1,
    title: "Task to Delete",
    description: "Description of the task to delete",
    duedate: "2023-09-01",
  };
  mockPoolQuery.mockResolvedValueOnce({ rows: [mockDeletedTask] });

  await deleteTask(mockRequest, mockResponse);

  expect(mockPoolQuery).toHaveBeenCalledWith(expect.any(String), ["1"]);
  expect(mockResponse.status).toHaveBeenCalledWith(204);
  expect(mockResponse.json).toHaveBeenCalledWith({ msg: "Task deleted" });
});
