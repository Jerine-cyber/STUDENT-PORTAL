// server/index.js (Complete code with Results, Assignments, Attendance, Calendar, and ToDos)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; 
const FRONTEND_URL = 'http://localhost:5173'; 

// --- DUMMY DATA ---

// 1. Results Data (Placeholder structure)
const studentResults = { 
    name: "Jerine Joshwa",
    id: "23becy018",
    semesters: [
      {
        semester: "Semester 1", gpa: 3.85,
        subjects: [
          { name: "Mathematics I", grade: "A", score: 92 },
          { name: "Physics", grade: "A-", score: 88 },
        ],
      },
    ],
}; 

// 2. Assignments Data
const studentAssignments = [
    { id: 1, title: "Data Structures Project", subject: "Computer Science II", dueDate: "2025-10-15", status: "Submitted", grade: "A-", color: "blue" },
    { id: 3, title: "Chemistry Lab Report", subject: "Chemistry", dueDate: "2025-10-25", status: "Pending", grade: null, color: "yellow" },
];

// 3. Attendance Data (EXISTING)
const studentAttendance = [
    { id: 1, subject: "Mathematics II", classesHeld: 45, classesAttended: 42 },
    { id: 2, subject: "Computer Science II", classesHeld: 50, classesAttended: 48 },
    { id: 5, subject: "Algorithms", classesHeld: 35, classesAttended: 25 },
];

// 4. Academic Calendar Data (NEW ADDITION) 🔑
const academicCalendar = [
    { month: "September 2025", events: [{ date: "Sept 1", event: "Classes Resume" }, { date: "Sept 20", event: "CIA - I begins" }] },
    { month: "October 2025", events: [{ date: "Oct 2", event: "Gandhi Jayanti" }, { date: "Oct 15", event: "Half-yearly Examinations begin" }] },
    { month: "November 2025", events: [{ date: "Nov 5", event: "End Semester Examinations start" }] },
];

// 5. Academic To-Dos Data (NEW ADDITION) 🔑
const academicTodos = [
    { id: 101, text: "Review Express.js setup for backend", completed: false, priority: "High" },
    { id: 102, text: "Update profile photo on student portal", completed: false, priority: "Low" },
    { id: 103, text: "Check email for lecture notes", completed: true, priority: "Medium" },
];
// -------------------------------------------------------------

// --- Middleware Setup ---
app.use(cors({
    origin: FRONTEND_URL, 
    credentials: true,
}));
app.use(express.json());

// --- API Routes ---

// Route 1: Results
app.get('/api/results', (req, res) => {
    res.status(200).json(studentResults);
});

// Route 2: Assignments
app.get('/api/assignments', (req, res) => {
    res.status(200).json(studentAssignments);
});

// Route 3: Attendance
app.get('/api/attendance', (req, res) => {
    res.status(200).json(studentAttendance);
});

// Route 4: Calendar (NEW)
app.get('/api/calendar', (req, res) => {
    res.status(200).json(academicCalendar);
});

// Route 5: To-Dos (NEW)
app.get('/api/todos', (req, res) => {
    res.status(200).json(academicTodos);
});

// --- Test Route ---
app.get('/', (req, res) => {
    res.send('Express Backend is Running!');
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`✅ Backend server listening on port ${PORT}`);
});