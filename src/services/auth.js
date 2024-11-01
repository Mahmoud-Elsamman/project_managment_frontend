import { jwtDecode } from "jwt-decode";

export function login(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  return { id: decoded.nameid, role: decoded.role };
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
