🎓 Student Portal Dashboard
A responsive, feature-rich academic dashboard built for college/university students to centralize their results, attendance, assignments, and calendar.

✨ Features
This application utilizes a modern, dark, and animated UI theme focused on user engagement and clarity.

🔐 Authentication: Secure Login/Signup pages using the Firebase SDK for Google OAuth (Social Login).

💻 Animated Dashboard: A full-height, collapsible animated sidebar provides fast navigation to core academic sections.

📊 Dynamic Data Fetching: Frontend pages are designed to fetch real data from a dedicated Express.js API.

✔️ Academic Tools: Dedicated pages for:

Results: Detailed, per-semester grade and GPA breakdown.

Assignments: Status tracking (Pending, Submitted, Graded) and due dates.

Attendance: Subject-wise percentage tracking and overall rate display.

Academic Calendar: Displays important events, exams, and holidays.

Mind Games: Integration point for simple, relaxing games (e.g., Snake Game).

🎨 Styling: Built entirely with Tailwind CSS for a responsive, component-based design.

🛠️ Technology Stack
Component	Technology	Purpose
Frontend	React.js (Vite)	UI development and component structure.
Styling	Tailwind CSS	Utility-first, responsive design and theming.
Routing	React Router DOM	Client-side navigation and Nested Routes for the sidebar.
Backend/API	Node.js / Express.js	Serves structured API data and handles database logic.
Database	MongoDB (via Express)	Stores and manages academic data (Grades, Assignments, etc.).
Auth	Firebase SDK	Handles Google Sign-in logic (OAuth).

Export to Sheets
🚀 Setup and Installation Guide
You must run the Backend (Express) and Frontend (React/Vite) in two separate terminal instances.

A. Backend Setup (API Server)
The backend runs on port 3001 and serves data from the API endpoints.

Navigate to the server directory and install dependencies:

Bash

cd server
npm install
Configure Environment Variables (.env):
Create a file named .env in the server/ directory and add your MongoDB connection string.

Code snippet

# server/.env
PORT=3001
MONGODB_URI="YOUR_MONGODB_ATLAS_CONNECTION_STRING" 
Run the Backend Server:

Bash

npm run dev
(Verify output: Backend server listening on port 3001)

B. Frontend Setup (React/Vite)
The frontend runs on port 5173 and fetches data from the backend.

Navigate back to the project root and install dependencies:

Bash

cd .. # Back to the project root
npm install
Configure Firebase:
Create src/firebaseConfig.js and paste your project credentials, ensuring the Google Sign-In method is enabled in the Firebase console.

Run the Frontend Server:

Bash

npm run dev
(Verify output: Vite server running at http://localhost:5173/)

🌐 API Endpoints
The React application fetches data from these endpoints (served by Express):

Endpoint	Data Served	React Page
/api/results	Per-semester grades and GPA.	ResultsPage.js
/api/assignments	List of homework and project deadlines.	AssignmentsPage.js
/api/attendance	Subject-wise attendance rates.	AttendancePage.js
/api/calendar	List of academic events and exams.	ActivitiesPage.js
/api/todos	Student's academic task list.	TodoPage.js

Export to Sheets
📂 Folder Structure Overview
STUDENT-PORTAL/
├── node_modules/
├── server/                    # 🔑 Node.js / Express Backend
│   ├── index.js               # Main server logic and API routes
│   └── package.json           
│
└── src/
    ├── components/
    │   ├── Assignments/         # (AssignmentCard.jsx, etc.)
    │   ├── Dashboard/           # (DashboardCard.jsx, ActivityFocusWidget.jsx)
    │   └── Todo/                # (TaskForm.jsx, TaskItem.jsx)
    │
    ├── pages/                   # Full-screen components used by the router
    │   ├── LoginPage.jsx
    │   ├── Dashboard.jsx
    │   ├── ResultsPage.js       # Fetches /api/results
    │   └── ... (AssignmentsPage, AttendancePage, GamesPage)
    │
    ├── firebaseConfig.js        # Firebase API keys
    └── App.jsx                  # React Router Configuration (Nested Routes)
🧑‍💻 Contributing
Found a bug or want to improve the UI? Contributions are welcome! Please open an issue or submit a pull request.

MIT License © 2024 Jerine Joshwa
