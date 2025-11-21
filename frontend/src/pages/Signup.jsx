import React, { useState } from "react";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.signup({ name, email, password });
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup failed", err);
      alert(err?.message || (err?.errors && err.errors[0]?.msg) || "Signup failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input className="form-control mt-3" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input className="form-control mt-3" placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input className="form-control mt-3" placeholder="Password (min 6)" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} minLength={6} required />
        <button className="btn btn-success mt-3 w-100">Signup</button>
      </form>
    </div>
  );
}
