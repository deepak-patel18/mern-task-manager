// src/pages/Tasks.jsx
import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

export default function Tasks(){
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(()=> { load(); }, []);

  async function load(){
    try {
      const list = await api.getTasks();
      setTasks(list || []);
    } catch (err) { console.error(err); }
  }

  async function createTask(e){
    e.preventDefault();
    try {
      const t = { title, description, status: "pending" };
      const created = await api.createTask(null, t); // api reads token from localStorage when token param null
      setTasks(prev => [created, ...prev]);
      setTitle(""); setDescription("");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Create failed");
    }
  }

  async function onDelete(id){
    if(!confirm("Delete task?")) return;
    try {
      await api.deleteTask(null, id);
      setTasks(prev => prev.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
  }

  async function toggleStatus(t){
    try {
      const updated = await api.updateTask(null, t._id, { status: t.status === "pending" ? "done" : "pending" });
      setTasks(prev => prev.map(p => p._id === updated._id ? updated : p));
    } catch (err) { console.error(err); }
  }

  function openEdit(t){
    setEditing(t);
    setModalOpen(true);
  }

  async function handleSave(payload){
    try{
      if(editing){
        const u = await api.updateTask(null, editing._id, payload);
        setTasks(prev => prev.map(p => p._id === u._id ? u : p));
      } else {
        const c = await api.createTask(null, payload);
        setTasks(prev => [c, ...prev]);
      }
      setModalOpen(false);
      setEditing(null);
    }catch(e){ console.error(e); alert("Save failed"); }
  }

  return (
    <div>
      <div className="header-row">
        <div className="header-title">My Tasks</div>
        <div>
          <button className="btn btn-primary" onClick={()=> setModalOpen(true)}>+ Add Task</button>
        </div>
      </div>

      <div className="quick-box">
        <form onSubmit={createTask} style={{display:"flex", gap:12, alignItems:"center", flexWrap:"wrap"}}>
          <input className="form-control" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required/>
          <input className="form-control" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
          <button className="btn btn-primary" type="submit">Add Task</button>
        </form>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14}}>
        {tasks.map(t => (
          <TaskCard key={t._id} task={t} onEdit={() => openEdit(t)} onDelete={() => onDelete(t._id)} onToggle={() => toggleStatus(t)} />
        ))}
      </div>

      {modalOpen && <TaskModal show onClose={()=>{setModalOpen(false); setEditing(null);}} task={editing} onSave={handleSave} />}
    </div>
  );
}
