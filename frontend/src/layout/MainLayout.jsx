import React from "react";
import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "250px" }}
      >
        <h4 className="mb-4">Task Manager</h4>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/dashboard" className="nav-link text-white">
              Dashboard
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/tasks" className="nav-link text-white">
              Tasks
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/profile" className="nav-link text-white">
              Profile
            </Link>
          </li>

          <li className="nav-item mt-4">
            <Link to="/login" className="btn btn-danger w-100">
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="p-4 flex-grow-1">{children}</div>
    </div>
  );
}

export default MainLayout;
