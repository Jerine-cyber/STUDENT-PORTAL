import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa'; // Import icon

// --- Dummy Data (Used as a fallback) ---
const DUMMY_ASSIGNMENTS_DATA = [
    { id: 1, title: "Data Structures Project: Linked Lists", subject: "Computer Science II", dueDate: "2025-10-15", status: "Pending", grade: null, color: "yellow" },
    { id: 2, title: "Literary Analysis Essay: Gatsby", subject: "English Literature", dueDate: "2025-10-20", status: "Graded", grade: "A-", color: "green" },
    { id: 3, title: "Chemistry Lab Report: Titration", subject: "Chemistry", dueDate: "2025-10-25", status: "Pending", grade: null, color: "yellow" },
    { id: 6, title: "Database Query Optimization Exercise", subject: "Database Systems", dueDate: "2025-10-10", status: "Graded", grade: "A+", color: "green" },
];

const AssignmentsPage = () => {
    const navigate = useNavigate();
    
    // 🔑 State to store fetched data
    const [studentAssignments, setStudentAssignments] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔑 useEffect to fetch data from the Express backend
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                // Fetch data from the Express Backend URL (Node.js/MongoDB API)
                const response = await fetch('http://localhost:3001/api/assignments'); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setStudentAssignments(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch assignments:", err);
                setError("Failed to load assignments. Please ensure the backend is running on port 3001.");
                setStudentAssignments(DUMMY_ASSIGNMENTS_DATA); // Fallback to dummy data
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []); // Runs once on component mount

    const getStatusColor = (status) => {
        switch (status) {
            case 'Submitted':
                return 'text-blue-400 bg-blue-900 bg-opacity-30';
            case 'Graded':
                return 'text-green-400 bg-green-900 bg-opacity-30';
            case 'Pending':
            default:
                return 'text-yellow-400 bg-yellow-900 bg-opacity-30';
        }
    };

    const getGradeColor = (grade) => {
        switch (grade) {
            case 'A+':
            case 'A':
                return 'text-green-400';
            case 'A-':
            case 'B+':
                return 'text-blue-400';
            case 'B':
            case 'B-':
                return 'text-yellow-400';
            default:
                return 'text-red-400';
        }
    };

    // --- Loading and Error States ---
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
                <FaBookOpen className="w-10 h-10 mr-3 text-blue-400 animate-pulse" /> 
                Loading Assignments...
            </div>
        );
    }

    if (error && studentAssignments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-10 text-red-400 bg-gray-900">
                <h1 className="mb-4 text-2xl">Data Load Failed!</h1>
                <p className="text-center">{error}</p>
                <p className="mt-4 text-sm text-gray-400">Please check your network connection and server status.</p>
            </div>
        );
    }
    // ---------------------------------

    return (
        <div className="relative min-h-screen p-6 overflow-hidden font-sans text-white sm:p-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
            
            {/* Abstract Background Elements for 3D feel */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute bg-blue-500 rounded-full top-1/4 left-1/4 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30"></div>
                <div className="absolute bg-purple-500 rounded-full top-1/2 right-1/4 w-96 h-96 mix-blend-multiply filter blur-xl opacity-30"></div>
                <div className="absolute bg-pink-500 rounded-full bottom-1/4 left-1/3 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl p-8 mx-auto transition-all duration-300 transform bg-white border border-white bg-opacity-10 border-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-3d-dark">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-2 mr-4 text-white transition-colors duration-200 rounded-full hover:text-gray-200 hover:bg-white hover:bg-opacity-20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <h1 className="flex items-center text-3xl font-extrabold text-white sm:text-4xl">
                        <FaBookOpen className="mr-3 text-blue-400" /> Academic Assignments
                    </h1>
                </div>

                {/* Assignments List */}
                <div className="mt-8 space-y-6">
                    {studentAssignments.length > 0 ? (
                        studentAssignments.map((assignment) => (
                            <div
                                key={assignment.id}
                                className="flex flex-col items-start justify-between p-6 transition-all duration-200 bg-white border border-white shadow-sm bg-opacity-5 rounded-xl border-opacity-10 md:flex-row md:items-center hover:shadow-md hover:bg-opacity-10"
                            >
                                <div className="flex-1 mb-4 md:mb-0">
                                    <h3 className="text-xl font-semibold text-white">{assignment.title}</h3>
                                    <p className="text-sm text-gray-300">{assignment.subject}</p>
                                </div>
                                <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-8">
                                    <div className="text-sm text-gray-400">
                                        <p className="font-medium">Due Date:</p>
                                        <p>{assignment.dueDate}</p>
                                    </div>
                                    <div className="text-center">
                                        <span
                                            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(assignment.status)}`}
                                        >
                                            {assignment.status}
                                        </span>
                                    </div>
                                    {assignment.grade && (
                                        <div className="text-lg font-bold">
                                            Grade: <span className={getGradeColor(assignment.grade)}>{assignment.grade}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-10 text-center text-gray-400 bg-white bg-opacity-5 rounded-xl">
                            No assignments found. Time to relax! 🎉
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignmentsPage;