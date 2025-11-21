// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { api } from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const storedUser = (() => {
    try {
      const s = localStorage.getItem("user");
      return s ? JSON.parse(s) : null;
    } catch (_) {
      return null;
    }
  })();

  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      refreshProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function refreshProfile() {
    if (!token) return;
    setLoading(true);
    try {
      const profile = await api.getProfile(token);
      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (err) {
      console.error("refreshProfile error", err);
      logout(); // invalid token -> logout
    } finally {
      setLoading(false);
    }
  }

  async function login({ email, password }) {
    setLoading(true);
    try {
      const res = await api.login({ email, password }); // { token }
      setToken(res.token);
      localStorage.setItem("token", res.token);
      // fetch profile
      const profile = await api.getProfile(res.token);
      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
      return profile;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async function updateProfile(payload) {
    if (!token) throw new Error("Not authenticated");
    const updated = await api.updateProfile(token, payload);
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    return updated;
  }

  async function changePassword(payload) {
    if (!token) throw new Error("Not authenticated");
    return await api.changePassword(token, payload);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, refreshProfile, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}
