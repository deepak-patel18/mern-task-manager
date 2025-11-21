// src/components/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="brand">Task Manager</div>

      <nav className="nav">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink>
        <NavLink to="/tasks" className={({isActive}) => isActive ? "active" : ""}>Tasks</NavLink>
        <NavLink to="/profile" className={({isActive}) => isActive ? "active" : ""}>Profile</NavLink>
      </nav>

      <div className="logout">
        <button className="btn btn-primary" onClick={doLogout} style={{width:"100%", background:"#e0444d", border:"none"}}>Logout</button>
      </div>
    </aside>
  );
}
