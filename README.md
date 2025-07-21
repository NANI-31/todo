# 📋 To-Do App – Full Stack (React + Node.js + MongoDB)

A feature-rich, user-authenticated task management application built with **React**, **Node.js**, **Express**, and **MongoDB**. This project includes full CRUD functionality, JWT-based authentication, filtering/sorting, drag-and-drop, and more — ideal for showcasing full-stack development skills.

---

## 🚀 Live Demo

🔗 **Frontend:** [Live Link](https://your-frontend-link.vercel.app)  
🔗 **Backend API:** [API Link](https://your-backend-api.onrender.com)

---

## 📦 Features

### 🌱 Basic Features
- ✅ Add Task (input + button)
- ✅ List All Tasks
- ✅ Mark Task as Complete / Incomplete
- ✅ Delete Task

### ⚙️ Intermediate Features
- 📝 Edit Task Title & Description
- 🔍 Filter Tasks (All / Completed / Incomplete)
- 🔃 Sort by Due Date / Priority
- 📱 Responsive Layout (Tailwind CSS)

### 🔐 Authentication Features
- 👤 Register / Login (JWT Auth)
- 🔒 Secure Routes (only user-specific tasks)
- 🚪 Logout Functionality

### 🚀 Advanced Features
- 🟰 Drag & Drop Tasks (`react-beautiful-dnd`)
- 🌗 Dark Mode Toggle
- 🏷️ Tags or Categories (e.g., "Work", "Personal")
- 🔔 Task Reminders (via Email)
- 🔍 Search Tasks
- 🤝 Share Task List with Others
- 📁 Export to PDF / CSV

---

## 🧱 Tech Stack

### Frontend
- React (Hooks, Context API)
- Tailwind CSS
- Axios
- React Router
- Framer Motion (for animations)
- react-beautiful-dnd

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)
- CORS & Helmet (Security)
- nodemailer + cron (for reminders)

---

## 🔐 API Endpoints

### 🧾 Auth
| Method | Route             | Description     |
|--------|------------------|-----------------|
| POST   | `/api/auth/register` | Register user  |
| POST   | `/api/auth/login`    | Login user     |

### ✅ Tasks (Protected Routes)
| Method | Route               | Description        |
|--------|--------------------|--------------------|
| GET    | `/api/tasks`        | Get all tasks (filter/sort) |
| POST   | `/api/tasks`        | Create a new task  |
| PUT    | `/api/tasks/:id`    | Update a task      |
| DELETE | `/api/tasks/:id`    | Delete a task      |

Use query params:  
`?status=completed&sortBy=dueDate`  
to filter and sort tasks.

---

## 🧩 MongoDB Schema

### 🔐 User
```js
{
  name: String,
  email: String,
  password: String // hashed
}
```
---
### 📝 Task
```js
{
  userId: mongoose.Schema.Types.ObjectId, // linked to user
  title: String,
  description: String,
  isCompleted: Boolean,
  priority: { type: String, enum: ["low", "medium", "high"] },
  dueDate: Date,
  tags: [String],
  reminderTime: Date,
  createdAt: { type: Date, default: Date.now }
}
```
## 📦 Setup Instructions

### 🔧 Prerequisites

- Node.js & npm
- MongoDB (Local or MongoDB Atlas)
### 📥 Clone the Repository

```bash
git clone https://github.com/your-username/fullstack-todo-app.git
cd fullstack-todo-app
```
---
# Future Improvements

## Planned Features

🔔Push notifications for reminders
 - Enable users to receive timely reminders through push notifications.

**📊Task history/logging**  
 - Maintain a log of completed and modified tasks for better tracking.

👥Team-based task collaboration 
 - Allow multiple users to collaborate on tasks and projects within a team.

📱Offline support with PWA
 - Implement Progressive Web App capabilities for offline functionality and improved user experience.

---
# 📸 Screenshots
---
# 💬 Feedback

Got feedback or want to contribute? Open an issue or submit a PR!  
✨ Happy Coding!
