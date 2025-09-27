import React, { useState, useEffect } from 'react'; // 🔑 FIX 1: Added useState and useEffect
import { useNavigate } from 'react-router-dom';
import { FaTrophy } from 'react-icons/fa'; // Added icon for visual appeal

const ResultsPage = () => {
    const navigate = useNavigate();
    
    // 🔑 FIX 2: State to hold fetched data (initialized to null for loading check)
    const [studentResults, setStudentResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dummy data structure (used only if fetch fails or for initial state setup)
    const dummyResults = {
        name: "Jerine Joshwa",
        id: "23becy018",
        semesters: [
            // ... your full dummy data structure here ...
            { semester: "Semester 1", gpa: 3.85, subjects: [{ name: "Mathematics I", grade: "A", score: 92 }, { name: "Physics", grade: "A-", score: 88 }] },
            { semester: "Semester 2", gpa: 4.00, subjects: [{ name: "Mathematics II", grade: "A+", score: 98 }, { name: "Data Structures", grade: "A", score: 91 }] },
            { semester: "Semester 3", gpa: 3.75, subjects: [{ name: "Database Systems", grade: "A-", score: 89 }, { name: "Algorithms", grade: "B+", score: 85 }] },
        ],
    };

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Fetch data from the Express backend
                const response = await fetch('http://localhost:3001/api/results');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                setStudentResults(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch results:", err);
                setError("Failed to load results. Please ensure the backend is running.");
                // Use dummy data as a fallback if the API is down
                setStudentResults(dummyResults);
            } finally {
                setLoading(false);
            }
        };
        
        fetchResults();
    }, []); // Empty dependency array means it runs only once on component mount

    const getGradeColor = (grade) => {
        switch (grade) {
            case 'A+': case 'A': return 'text-green-400 font-bold';
            case 'A-': case 'B+': return 'text-blue-400 font-semibold';
            case 'B': case 'B-': return 'text-yellow-400 font-semibold';
            default: return 'text-red-400';
        }
    };
    
    // --- Loading and Error States ---
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
                <FaTrophy className="w-8 h-8 mr-3 text-yellow-400 animate-spin" /> 
                Loading Academic Data...
            </div>
        );
    }
    
    // If studentResults is null/empty AND an error occurred during fetch
    if (error && !studentResults) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-10 text-red-400 bg-gray-900">
                <h1 className="mb-4 text-2xl">Data Load Failed!</h1>
                <p className="text-center">{error}</p>
                <p className="mt-4 text-sm text-gray-400">Please ensure your Node.js server is running on port 3001.</p>
            </div>
        );
    }
    // --- End Loading/Error States ---


    return (
        <div className="relative min-h-screen p-6 overflow-hidden font-sans text-white sm:p-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
            
            {/* Abstract Background Elements for 3D feel */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute bg-blue-500 rounded-full top-1/4 left-1/4 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30"></div>
                <div className="absolute bg-purple-500 rounded-full top-1/2 right-1/4 w-96 h-96 mix-blend-multiply filter blur-xl opacity-30"></div>
                <div className="absolute bg-pink-500 rounded-full bottom-1/4 left-1/3 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl p-8 mx-auto transition-transform duration-300 bg-white border border-white bg-opacity-10 border-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-3d-dark">
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
                        <FaTrophy className="mr-3 text-yellow-400"/> Academic Results
                    </h1>
                </div>

                {/* Student Info Card */}
                <div className="p-6 mb-8 bg-white border border-white shadow-sm bg-opacity-5 rounded-xl border-opacity-10">
                    <h2 className="text-2xl font-bold text-white">{studentResults.name}</h2>
                    <p className="text-gray-300">Student ID: {studentResults.id}</p>
                </div>

                {/* Semesters & Subjects */}
                {studentResults.semesters.map((semester, index) => (
                    <div key={index} className="p-6 mb-8 bg-white border border-white shadow-sm bg-opacity-5 rounded-xl border-opacity-10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-blue-400">{semester.semester}</h3>
                            <p className="text-lg font-bold text-white">GPA: <span className="text-green-400">{semester.gpa.toFixed(2)}</span></p>
                        </div>
                        
                        <div className="space-y-3">
                            {semester.subjects.map((subject, subjectIndex) => (
                                <div key={subjectIndex} className="flex items-center justify-between p-4 transition-transform duration-200 bg-white border border-white rounded-lg bg-opacity-10 shadow-inner-white border-opacity-10 hover:bg-opacity-20 hover:scale-105">
                                    <span className="font-medium text-white">{subject.name}</span>
                                    <div className="flex items-center space-x-4">
                                        <span className={`text-lg ${getGradeColor(subject.grade)}`}>{subject.grade}</span>
                                        <span className="text-sm text-gray-400">({subject.score}%)</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;