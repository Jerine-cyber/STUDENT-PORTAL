import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Import all components
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import PageTemplate from './components/PageTemplate';
import TodoPage from './components/TodoPage';
import ResultsPage from './components/ResultsPage';
import AssignmentsPage from './components/AssignmentsPage';
import AttendancePage from './components/AttendancePage';
import GamesPage from './components/GamesPage';
import CalendarPage from './components/CalendarPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finish React UI Components", completed: false },
    { id: 2, text: "Prepare for a quiz", completed: true },
    { id: 3, text: "Read Chapter 5 of textbook", completed: false }
  ]);
  
  // State to track if the authentication check is complete
  const [loading, setLoading] = useState(true);

  // This hook runs once on component mount to check the user's auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 'user' is null if not authenticated, or a user object if authenticated
      setIsAuthenticated(!!user);
      // Once the check is done, set loading to false
      setLoading(false);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show a loading screen while the auth state is being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* AUTH PAGES */}
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} />} />

        {/* DASHBOARD MAIN ROUTE (Protected) */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" replace />}
        />

        {/* DASHBOARD SUB-ROUTES (Protected) */}
        <Route path="/dashboard/results" element={isAuthenticated ? <ResultsPage /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard/assignments" element={isAuthenticated ? <AssignmentsPage /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard/attendance" element={isAuthenticated ? <AttendancePage /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard/games" element={isAuthenticated ? <GamesPage /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard/todo" element={isAuthenticated ? <TodoPage tasks={tasks} setTasks={setTasks} /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard/calendar" element={isAuthenticated ? <CalendarPage /> : <Navigate to="/login" replace />} />
        
        {/* DEFAULT REDIRECT */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;