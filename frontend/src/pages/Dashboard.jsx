// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function Dashboard(){
  const [stats, setStats] = useState({ total:0, done:0, pending:0, high:0 });

  useEffect(()=> {
    async function fetchStats(){
      try {
        const tasks = await api.getTasks(); // api auto attaches token
        const total = tasks.length;
        const done = tasks.filter(t => t.status === "done").length;
        const pending = total - done;
        const high = tasks.filter(t => t.priority === "high").length || 0;
        setStats({ total, done, pending, high });
      } catch (err) {
        console.error(err);
      }
    }
    fetchStats();
  },[]);

  return (
    <div>
      <div className="header-row">
        <div>
          <div className="header-title">Dashboard</div>
          <div className="form-text-muted">Welcome back — here's an overview of your tasks</div>
        </div>
      </div>

      <div className="cards-row">
        <div className="stat-card">
          <div className="num">{stats.total}</div>
          <div className="label">Total Tasks</div>
        </div>

        <div className="stat-card">
          <div className="num">{stats.done}</div>
          <div className="label">Completed</div>
        </div>

        <div className="stat-card">
          <div className="num">{stats.pending}</div>
          <div className="label">Pending</div>
        </div>

        <div className="stat-card">
          <div className="num">{stats.high}</div>
          <div className="label">High Priority</div>
        </div>
      </div>

      <div className="quick-box">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div><strong>Quick Actions</strong></div>
          <div>
            <a href="/tasks" className="btn btn-primary" style={{marginRight:8}}>Manage Tasks</a>
            <a href="/profile" className="btn btn-ghost">Edit Profile</a>
          </div>
        </div>
      </div>
    </div>
  );
}
