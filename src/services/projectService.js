import axios from "axios";
import { getToken } from "./authService";
import api from "./api";

// const API_URL = "/projects";

export const getProjects = async () => {
  const response = await api.get("/project");
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.message);
  }
};

export const getProjectById = async (projectId) => {
  console.log(projectId);
  const response = await api.get(`/project/${projectId}`);
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.message);
  }
};

export const addProject = async (projectData) => {
  console.log("project", projectData);
  const response = await api.post("/project", projectData);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.data.message);
  }
};

export const editProject = async (projectId, projectData) => {
  const response = await api.put(`/project/${projectId}`, projectData);

  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.message);
  }
};

export const deleteProject = async (projectId) => {
  const response = await api.delete(`/project/${projectId}`);

  console.log("response", response);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.data.message);
  }
};
