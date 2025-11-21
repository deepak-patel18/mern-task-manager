// src/components/TaskModal.jsx
import React, { useEffect, useState } from "react";

export default function TaskModal({ show, onClose, onSave, task }){
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "pending");

  useEffect(()=>{ setTitle(task?.title || ""); setDescription(task?.description || ""); setStatus(task?.status || "pending"); }, [task]);

  function submit(e){
    e.preventDefault();
    onSave({ title, description, status });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-window">
        <h3>{task ? "Edit Task" : "Add Task"}</h3>
        <form onSubmit={submit}>
          <input className="form-control" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required/>
          <textarea className="form-control" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
          <div style={{marginTop:8}}>
            <label style={{marginRight:8}}>Status</label>
            <select className="form-control" value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div style={{display:"flex", gap:8, justifyContent:"flex-end", marginTop:12}}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" type="submit">{task ? "Save" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
