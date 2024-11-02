import axios from "axios";
import { getToken } from "./authService";
import api from "./api";

// const API_URL = "/task";

export const getTaskById = async (taskId) => {
  const response = await api.get(`task/${taskId}`);
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.message);
  }
};

export const getProjectTasks = async (projectId, user) => {
  const response = await api.get(`task/project/${projectId}`);
  if (response.data.success) {
    return response.data.data.filter(
      (task) => user.role === "Manager" || task.assignedTo === user.username
    );
  } else {
    throw new Error(response.data.message);
  }
};

export const getOverdueTasks = async (user) => {
  const response = await api.get(`/task/overdue`);

  if (response.data.success) {
    return response.data.data.filter(
      (task) => user.role === "Manager" || task.assignedTo === user.username
    );
  } else {
    throw new Error(response.data.message);
  }
};

export const addTask = async (taskData) => {
  const response = await api.post("task", taskData);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.data.message);
  }
};

export const editTask = async (taskId, taskData) => {
  const response = await api.put(`task/${taskId}`, taskData);
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.message);
  }
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`task/${taskId}`);
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.message);
  }
};
