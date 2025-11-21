# Task Manager Application (MERN Stack)

A fully functional MERN (MongoDB, Express, React, Node.js) application designed for managing daily tasks with authentication, user profile management, secure password updates, and task prioritization.  
This project demonstrates clean frontend architecture, scalable backend APIs, modular components, and secure JWT-based authentication.

---

## 🔗 Live Demo
Frontend (Vercel):  
👉 https://your-frontend.vercel.app/

Backend (Render/Railway):  
👉 https://your-backend-url.com  
*(Optional — backend may run locally for evaluation)*

---
Task/
├── frontend/ # Vite + React + Bootstrap UI
└── backend/ # Node.js + Express + MongoDB API

---

# 🚀 Tech Stack

### **Frontend**
- React (Vite)
- Redux/Context API (Auth state)
- React Router
- Axios
- Bootstrap 5
- Modular Component Structure

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- BCrypt Password Hashing
- CORS Enabled REST API

---

# ✨ Core Features

### 🔐 **Authentication**
- User signup
- User login with JWT
- Fully secure protected routes
- Auto token persistence (localStorage)

### 👤 **User Profile Module**
- View basic profile (name, email)
- Update password securely
- /me endpoint for authorized fetch

### 📋 **Task Management**
- Create new task
- Edit existing task
- Delete task
- Mark task as completed
- Priorities: Low, Medium, High

### 🎛 **Enhanced UI/UX**
- Bootstrap-based responsive layout
- Dashboard with navigation sidebar
- Clean and minimal design

---

# 🧩 API Documentation (Backend)

### **AUTH**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login user and return JWT |
| GET | `/api/auth/me` | Get authenticated user profile |
| PUT | `/api/auth/change-password` | Update password |

### **TASKS**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get tasks for logged-in user |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| PUT | `/api/tasks/complete/:id` | Mark task as completed |

---

# ⚙️ How to Run the Project

## ▶️ Backend Setup

```sh
cd backend
npm install

showcase

👨‍💻 Author

Deepak Patel
MCA | Full Stack Developer | React | Node.js | MongoDB
Mumbai, India

GitHub: https://github.com/your-username

LinkedIn: https://linkedin.com/in/your-profile