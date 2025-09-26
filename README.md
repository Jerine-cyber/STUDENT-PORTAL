# 🎓 Student Portal Dashboard

A responsive, feature-rich academic dashboard built for college/university students to centralize their **results, attendance, assignments, and calendar** — all in one place.

---

## ✨ Features

This application is designed with a **modern, dark, and animated UI theme** focused on user engagement and clarity.

- 🔐 **Authentication** – Secure Login/Signup with Firebase SDK and Google OAuth (Social Login).  
- 💻 **Animated Dashboard** – Full-height, collapsible, animated sidebar for smooth navigation.  
- 📊 **Dynamic Data Fetching** – Frontend pages fetch real data from a dedicated Express.js API.  
- ✔️ **Academic Tools**:
  - **Results** – Detailed semester grades & GPA breakdown.  
  - **Assignments** – Track pending, submitted, and graded tasks with due dates.  
  - **Attendance** – Subject-wise percentages and overall rate visualization.  
  - **Academic Calendar** – View important events, exams, and holidays.  
  - **Mind Games** – Built-in simple games (e.g., Snake) for relaxation.  
- 🎨 **Styling** – Built with **Tailwind CSS** for a clean, responsive, and component-based design.  

---

## 🛠️ Technology Stack

| Component   | Technology         | Purpose                                              |
|-------------|--------------------|------------------------------------------------------|
| Frontend    | React.js (Vite)    | UI development and component structure               |
| Styling     | Tailwind CSS       | Utility-first, responsive design & theming           |
| Routing     | React Router DOM   | Client-side navigation with Nested Routes            |
| Backend/API | Node.js / Express  | REST API for academic data                           |
| Database    | MongoDB (Atlas)    | Data storage (Grades, Assignments, Attendance, etc.) |
| Auth        | Firebase SDK       | Secure login via Google OAuth                        |

---

## 🚀 Setup & Installation Guide

This project runs **Frontend (React/Vite)** and **Backend (Express.js)** in separate terminals.

---

### A. Backend Setup (API Server)

Runs on **port 3001**.

```bash
cd server
npm install
1. Configure Environment Variables
Create a .env file in the server/ directory:

env
Copy code
PORT=3001
MONGODB_URI="YOUR_MONGODB_ATLAS_CONNECTION_STRING"
2. Run Backend Server
bash
Copy code
npm run dev
✅ Verify: Backend server listening on port 3001

B. Frontend Setup (React/Vite)
Runs on port 5173.

bash
Copy code
cd ..
npm install
1. Configure Firebase
Create src/firebaseConfig.js and add your Firebase project credentials.
Make sure Google Sign-In is enabled in the Firebase Console.

2. Run Frontend Server
bash
Copy code
npm run dev
✅ Verify: Vite server running at http://localhost:5173/

🌐 API Endpoints
Endpoint	Data Served	React Page
/api/results	Semester grades & GPA	ResultsPage.js
/api/assignments	Assignments & due dates	AssignmentsPage.js
/api/attendance	Subject-wise attendance	AttendancePage.js
/api/calendar	Events, exams, and holidays	ActivitiesPage.js
/api/todos	Student's academic task list	TodoPage.js

📂 Folder Structure
bash
Copy code
STUDENT-PORTAL/
├── node_modules/
├── server/                    # 🔑 Node.js / Express Backend
│   ├── index.js               # Main server logic & API routes
│   └── package.json           
│
└── src/
    ├── components/
    │   ├── Assignments/       # (AssignmentCard.jsx, etc.)
    │   ├── Dashboard/         # (DashboardCard.jsx, ActivityFocusWidget.jsx)
    │   └── Todo/              # (TaskForm.jsx, TaskItem.jsx)
    │
    ├── pages/                 # Full-screen routed pages
    │   ├── LoginPage.jsx
    │   ├── Dashboard.jsx
    │   ├── ResultsPage.js
    │   ├── AssignmentsPage.js
    │   ├── AttendancePage.js
    │   ├── ActivitiesPage.js
    │   └── GamesPage.js
    │
    ├── firebaseConfig.js      # Firebase credentials
    └── App.jsx                # Router + Layout
🧑‍💻 Contributing
Contributions are welcome! 🎉

Found a bug? Open an issue.

Want to improve the UI? Submit a pull request.

📜 License
MIT License © 2024 Jerine Joshwa
