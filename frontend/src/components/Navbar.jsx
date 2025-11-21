import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold text-white" to="/dashboard">
        MyApp
      </Link>

      <div className="ms-auto d-flex">
        <Link className="btn btn-light me-2" to="/tasks">
          Tasks
        </Link>

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
