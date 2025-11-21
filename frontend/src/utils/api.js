// src/utils/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  const tkn = token || localStorage.getItem("token");
  if (tkn) headers["Authorization"] = `Bearer ${tkn}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  // try to parse JSON safely
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    // if backend returns plain text, wrap it
    data = { message: text };
  }

  if (!res.ok) {
    // normalize error object
    const error = data && data.message ? { message: data.message, status: res.status } : { status: res.status, ...data };
    throw error;
  }
  return data;
}

export const api = {
  signup: (payload) => request("/api/auth/signup", "POST", payload),
  login: (payload) => request("/api/auth/login", "POST", payload),
  getProfile: (token) => request("/api/auth/me", "GET", null, token),
  updateProfile: (token, payload) => request("/api/auth/update-profile", "PUT", payload, token),
  changePassword: (token, payload) => request("/api/auth/change-password", "PUT", payload, token),

  // tasks
  getTasks: (token) => request("/api/tasks", "GET", null, token),
  createTask: (token, payload) => request("/api/tasks", "POST", payload, token),
  updateTask: (token, id, payload) => request(`/api/tasks/${id}`, "PUT", payload, token),
  deleteTask: (token, id) => request(`/api/tasks/${id}`, "DELETE", null, token),
};

export default api;
