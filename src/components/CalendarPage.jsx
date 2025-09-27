import React, { useState, useEffect } from 'react'; // 🔑 Import useState and useEffect
import { useNavigate } from 'react-router-dom';
import { FaCalendarDay } from 'react-icons/fa'; // Added icon for the header

const CalendarPage = () => {
    const navigate = useNavigate();

    // 🔑 State to store fetched data
    const [academicCalendar, setAcademicCalendar] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dummy data structure (used for immediate render or fallback)
    const dummyCalendar = [
        { month: "September 2025", events: [{ date: "Sept 1", event: "Classes Resume" }] },
        { month: "October 2025", events: [{ date: "Oct 2", event: "Gandhi Jayanti" }] },
    ];

    // 🔑 useEffect to fetch data from the Express backend
    useEffect(() => {
        const fetchCalendar = async () => {
            try {
                // Fetch data from the Express Backend URL
                const response = await fetch('http://localhost:3001/api/calendar'); 
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setAcademicCalendar(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch calendar data:", err);
                setError("Failed to load calendar. Please ensure the backend is running on port 3001.");
                setAcademicCalendar(dummyCalendar); // Fallback to dummy data
            } finally {
                setLoading(false);
            }
        };

        fetchCalendar();
    }, []); // Runs once on component mount

    // --- Loading and Error States ---
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
                <FaCalendarDay className="w-8 h-8 mr-3 text-purple-400 animate-pulse" /> 
                Loading Academic Calendar...
            </div>
        );
    }

    if (error && academicCalendar.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-10 text-red-400 bg-gray-900">
                <h1 className="mb-4 text-2xl">Data Load Failed!</h1>
                <p className="text-center">{error}</p>
                <p className="mt-4 text-sm text-gray-400">Please check your Node.js server status.</p>
            </div>
        );
    }
    // ---------------------------------

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-6 font-sans sm:p-10 bg-gradient-to-br from-indigo-50 to-blue-100">
            
            {/* Main Content Card - Enhanced Shadow/Depth */}
            <div className="w-full max-w-4xl p-8 transition-all duration-500 transform bg-white shadow-3xl rounded-3xl backdrop-filter backdrop-blur-sm">
                
                {/* Header Section */}
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-3 mr-4 text-white transition-colors duration-200 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <h1 className="flex items-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        <FaCalendarDay className="mr-3 text-purple-600" /> Academic Calendar
                    </h1>
                </div>

                <p className="pb-3 mb-8 text-lg font-medium text-gray-600 border-b">Karpagam College of Engineering - 2025-2026</p>

                {/* Calendar Months Container */}
                <div className="space-y-8">
                    {academicCalendar.map((monthData, monthIndex) => (
                        <div 
                            key={monthIndex} 
                            // 3D Effect on Month Block
                            className="p-0 border border-gray-100 shadow-lg bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                        >
                            
                            {/* Header with Gradient Background */}
                            <h2 className="px-6 py-3 text-xl font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600">
                                {monthData.month}
                            </h2>
                            
                            {/* Events List */}
                            <ul className="p-4 space-y-3">
                                {monthData.events.map((event, eventIndex) => (
                                    <li 
                                        key={eventIndex} 
                                        // 3D Effect on Event Item
                                        className="flex items-center justify-between p-4 transition-colors duration-150 bg-white border-l-4 border-r-4 border-transparent rounded-lg shadow-sm hover:border-indigo-400 hover:bg-indigo-50/70"
                                    >
                                        <span className="font-semibold text-gray-800">{event.date}</span>
                                        <span className="text-gray-600">{event.event}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;