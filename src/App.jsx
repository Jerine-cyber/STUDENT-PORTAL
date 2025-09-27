// src/App.jsx (Corrected Imports and Component Mapping)

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; 

// 🔑 CORRECTED Imports: All pages are assumed to be in ./pages/ and named correctly.
import LoginPage from './components/LoginPage.jsx'; // Corrected Path/Name
import SignupPage from './components/SignupPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import TodoPage from './components/TodoPage.jsx';
import ResultsPage from './components/ResultsPage.jsx';
import AssignmentsPage from './components/AssignmentsPage.jsx';
import AttendancePage from './components/AttendancePage.jsx';
import GamesPage from './components/GamesPage.jsx';
import CalendarPage from './components/CalendarPage.jsx';
import ProfilePage from './components/ProfilePage.jsx'; // Assuming ProfilePage is correctly named and located

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-xl text-white">Checking authentication...</p>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                {/* AUTH PAGES */}
                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} />} />

                {/* DASHBOARD NESTED ROUTE STRUCTURE (Correct) */}
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" replace />}
                >
                    {/* The index route renders the default content */}
                    <Route index element={
                        <div className="p-10 mt-4 text-center bg-gray-800 rounded-xl">
                            <h2 className="text-3xl font-bold text-blue-400">Select an item from the sidebar.</h2>
                            <p className="mt-3 text-gray-400">Welcome back!</p>
                        </div>
                    } />
                    
                    {/* Child Routes rendering inside <Outlet /> */}
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="results" element={<ResultsPage />} />
                    <Route path="assignments" element={<AssignmentsPage />} />
                    <Route path="attendance" element={<AttendancePage />} />
                    <Route path="games" element={<GamesPage />} />
                    <Route path="todo" element={<TodoPage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    
                </Route>
                
                {/* DEFAULT REDIRECT */}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
            </Routes>
        </Router>
    );
};

export default App;