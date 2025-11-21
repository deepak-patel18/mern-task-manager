// src/pages/ChangePassword.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ChangePassword() {
  const { changePassword } = useContext(AuthContext);
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await changePassword({ oldPassword: oldPassword, newPassword });
      setMsg("Password changed successfully");
    } catch (err) {
      console.error(err);
      setMsg(err?.message || "Password change failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      <h2>Change Password</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={onSubmit}>
        <input className="form-control mt-3" placeholder="Old password" type="password" value={oldPassword} onChange={(e)=>setOld(e.target.value)} required />
        <input className="form-control mt-3" placeholder="New password" type="password" value={newPassword} onChange={(e)=>setNew(e.target.value)} required minLength={6} />
        <button className="btn btn-primary mt-3 w-100">Change Password</button>
      </form>
    </div>
  );
}
