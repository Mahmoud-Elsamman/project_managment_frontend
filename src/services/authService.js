import { jwtDecode } from "jwt-decode";
import axios from "axios";
import api from "./api";

const API_URL = "/Auth";

export const login = async (username, password) => {
  const response = await api.post(`${API_URL}/login`, { username, password });

  console.log("response", response);
  if (response.data.success) {
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    localStorage.setItem("token", response.data.data.token);
    return response.data.data.token;
  } else {
    throw new Error(response.data.message || "Login failed");
  }
};

export const registerUser = async (userData) => {
  const response = await api.post(`${API_URL}/register`, userData);

  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.message || "Error in creating user");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
