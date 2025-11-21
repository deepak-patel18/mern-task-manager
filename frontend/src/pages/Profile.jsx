// src/pages/Profile.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile(){
  const { user, updateProfile, logout } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [msg, setMsg] = useState("");

  useEffect(()=> { if(user) setName(user.name || ""); }, [user]);

  async function submit(e){
    e.preventDefault(); setMsg("");
    try {
      await updateProfile({ name });
      setMsg("Profile updated successfully");
    } catch (err) {
      console.error(err);
      setMsg(err?.message || "Update failed");
    }
  }

  return (
    <div>
      <div className="header-row">
        <div className="header-title">My Profile</div>
      </div>

      <div className="quick-box">
        {msg && <div className="form-text-muted">{msg}</div>}

        <form onSubmit={submit}>
          <label className="form-text-muted">Name</label>
          <input className="form-control" value={name} onChange={e=>setName(e.target.value)} required />

          <label className="form-text-muted" style={{marginTop:12}}>Email</label>
          <input className="form-control" value={user?.email || ""} disabled />

          <div style={{display:"flex", gap:10, marginTop:14}}>
            <button className="btn btn-primary" type="submit">Update Profile</button>
            <button className="btn btn-ghost" type="button" onClick={logout}>Logout</button>
          </div>
        </form>
      </div>
    </div>
  );
}
