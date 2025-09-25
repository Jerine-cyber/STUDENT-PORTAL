import React, { useState, useEffect } from 'react'; // 🔑 Added useState and useEffect
import { useNavigate } from 'react-router-dom';
import { FaClipboardCheck } from 'react-icons/fa'; // Added icon import

const AttendancePage = () => {
  const navigate = useNavigate();
  // 🔑 State to store the fetched attendance data
  const [studentAttendance, setStudentAttendance] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔑 useEffect to fetch data from the Express backend
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // 🔑 Fetch data from the Express Backend URL
        const response = await fetch('http://localhost:3001/api/attendance'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudentAttendance(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
        setError("Failed to load attendance data. Is the backend server running on port 3001?");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []); // Runs once on component mount

  const getAttendancePercentage = (held, attended) => {
    if (held === 0) return 0;
    return Math.round((attended / held) * 100);
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 85) {
      return 'text-green-400 font-bold';
    } else if (percentage >= 75) {
      return 'text-yellow-400 font-bold';
    } else {
      return 'text-red-400 font-bold';
    }
  };

  // --- Loading and Error States ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <FaClipboardCheck className="w-10 h-10 mr-3 text-teal-400 animate-pulse" /> 
        Loading Attendance Data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-10 text-red-400 bg-gray-900">
        <h1 className="mb-4 text-2xl">Data Load Failed!</h1>
        <p className="text-center">{error}</p>
        <p className="mt-4 text-sm text-gray-400">Please ensure your Node.js server is running on http://localhost:3001.</p>
      </div>
    );
  }
  // ---------------------------------

  return (
    <div className="relative min-h-screen p-6 overflow-hidden font-sans text-white sm:p-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
      
      {/* Abstract Background Elements (Unchanged) */}
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
             <FaClipboardCheck className="mr-3 text-teal-400" /> Attendance
          </h1>
        </div>

        {/* Attendance Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full bg-white bg-opacity-5 shadow-inner-white rounded-xl">
            <thead>
              <tr className="text-sm font-semibold tracking-wider text-left text-gray-300 uppercase bg-white bg-opacity-5">
                <th className="px-6 py-3 rounded-tl-xl">Subject</th>
                <th className="px-6 py-3">Classes Held</th>
                <th className="px-6 py-3">Classes Attended</th>
                <th className="px-6 py-3 rounded-tr-xl">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white divide-opacity-10">
              {studentAttendance.map((item) => {
                const percentage = getAttendancePercentage(item.classesHeld, item.classesAttended);
                return (
                  <tr key={item.id} className="transition-colors duration-200 hover:bg-white hover:bg-opacity-10">
                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{item.subject}</td>
                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{item.classesHeld}</td>
                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{item.classesAttended}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-lg ${getPercentageColor(percentage)}`}>
                        {percentage}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;