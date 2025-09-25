import React from 'react';
import { useNavigate } from 'react-router-dom';
// ⚠️ Assuming the handleLogout function is imported correctly from your Firebase setup
import { handleLogout } from '../firebase'; 

const Dashboard = () => {
  const navigate = useNavigate();
  const studentName = "Student"; // Placeholder for dynamic name

  const onLogout = async () => {
    // 1. Execute Firebase logout
    await handleLogout(); 
    
    // 2. Update frontend state (optional, if using context)
    // setIsAuthenticated(false); 
    
    // 3. Redirect to login page
    navigate('/login');
  };

  const mainCards = [
    // Matches Express /api/results and App.jsx /dashboard/results
    { name: "Results", path: "results", icon: "📊", description: "View your academic results and grades.", gradient: "from-purple-600 to-indigo-600" },
    
    // Matches Express /api/assignments and App.jsx /dashboard/assignments
    { name: "Assignments", path: "assignments", icon: "📝", description: "Manage your assignments and due dates.", gradient: "from-blue-600 to-cyan-600" },
    
    // Matches Express /api/attendance and App.jsx /dashboard/attendance
    { name: "Attendance", path: "attendance", icon: "🗓️", description: "Track your class attendance record.", gradient: "from-green-600 to-lime-600" },
    
    // Placeholder - Maps to a Games page route
    { name: "Mind Relaxing Games", path: "games", icon: "🎮", description: "Take a break and relax your mind.", gradient: "from-pink-600 to-red-600" }
  ];

  return (
    <div className="relative min-h-screen p-6 overflow-hidden font-sans text-white sm:p-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
      
      {/* Abstract Background Elements for 3D feel (Tailwind required for 'animate-blob' classes) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute bg-blue-500 rounded-full top-1/4 left-1/4 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute bg-purple-500 rounded-full top-1/2 right-1/4 w-96 h-96 mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute bg-pink-500 rounded-full bottom-1/4 left-1/3 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30"></div>
      </div>
      
      <div className="relative z-10 py-12 mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between mb-8 space-y-4 sm:flex-row sm:items-center sm:mb-10 sm:space-y-0">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">Good morning, {studentName}!</h1>
            <p className="mt-2 text-xl text-gray-300">Welcome to your personal academic space.</p>
          </div>
          <button
            onClick={onLogout}
            className="px-6 py-2 font-semibold text-white transition-colors bg-red-600 rounded-md shadow-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-3">
          {/* Main Cards Section */}
          <div className="grid grid-cols-1 col-span-2 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {mainCards.map((card) => (
              <div 
                key={card.name} 
                className="relative p-6 overflow-hidden transition-transform duration-300 bg-white border border-white cursor-pointer sm:p-8 rounded-2xl shadow-3d-dark hover:scale-105 hover:shadow-3d-dark-hover bg-opacity-10 border-opacity-20 backdrop-blur-md"
                onClick={() => navigate(`/dashboard/${card.path}`)}
              >
                {/* Inner colored gradient for the 3D glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <span className="mr-2 text-3xl text-white">{card.icon}</span>
                    <h2 className="text-lg font-bold text-white">{card.name}</h2>
                  </div>
                  <p className="text-sm text-gray-200 opacity-85">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Side Cards Section */}
          <div className="grid grid-cols-1 gap-8">
            <div 
              className="relative p-6 overflow-hidden transition-transform duration-300 bg-white cursor-pointer rounded-2xl shadow-3d-dark bg-opacity-10 hover:scale-105 hover:shadow-3d-dark-hover backdrop-blur-md"
              onClick={() => navigate('/dashboard/todo')} // Matches App.jsx /dashboard/todo
            >
              <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-br from-indigo-600 to-blue-600 opacity-20 group-hover:opacity-30 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-2">
                  <span className="mr-2 text-2xl text-white">✅</span>
                  <h3 className="text-lg font-bold text-white">Academic To-Dos</h3>
                </div>
                <p className="text-sm text-gray-300">Organize your tasks and academic priorities.</p>
              </div>
            </div>
            
            <div 
              className="relative p-6 overflow-hidden transition-transform duration-300 bg-white cursor-pointer rounded-2xl shadow-3d-dark bg-opacity-10 hover:scale-105 hover:shadow-3d-dark-hover backdrop-blur-md"
              onClick={() => navigate('/dashboard/calendar')} // Matches App.jsx /dashboard/calendar
            >
              <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-br from-yellow-600 to-orange-600 opacity-20 group-hover:opacity-30 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-2">
                  <span className="mr-2 text-2xl text-white">📅</span>
                  <h3 className="text-lg font-bold text-white">Academic Calendar</h3>
                </div>
                <p className="text-sm text-gray-300">View upcoming events, exams, and holidays.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;