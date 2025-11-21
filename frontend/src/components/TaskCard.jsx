// src/components/TaskCard.jsx
import React from "react";

export default function TaskCard({ task, onEdit, onDelete, onToggle }){
  return (
    <div className="task-card">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"start"}}>
        <div style={{fontWeight:700, fontSize:16}}>{task.title}</div>
        <div style={{fontSize:12, color:"#fff", padding:"6px 8px", borderRadius:8, background: task.status === "done" ? "#22c55e" : "#f59e0b"}}>
          {task.status}
        </div>
      </div>

      <div style={{color:"var(--muted)", fontSize:14}}>{task.description}</div>

      <div className="task-actions" style={{marginTop:8}}>
        <div style={{display:"flex", gap:8}}>
          <button className="btn btn-ghost" onClick={onEdit}>Edit</button>
          <button className="btn" style={{background:"#ef4444", color:"#fff"}} onClick={onDelete}>Delete</button>
        </div>

        <div>
          <button className="btn btn-primary" onClick={onToggle}>
            {task.status === "done" ? "Mark Pending" : "Mark Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
