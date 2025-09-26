import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion'; // 👈 Import Framer Motion
// ⚠️ Assuming the handleLogout function is imported correctly from your Firebase setup
import { handleLogout } from '../firebase'; 

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const studentName = "Jerine Joshwa"; // 👈 Example dynamic user name

  // Navigation Data - Using icons for a professional look
  const navItems = [
    { name: "Dashboard", path: "", icon: "🏠", baseRoute: true }, // Base route
    { name: "Results", path: "results", icon: "📊" },
    { name: "Assignments", path: "assignments", icon: "📝" },
    { name: "Attendance", path: "attendance", icon: "🗓️" },
    { name: "Academic To-Dos", path: "todo", icon: "✅" },
    { name: "Calendar", path: "calendar", icon: "📅" },
    { name: "Mind Games", path: "games", icon: "🎮" },
  ];

  const onLogout = async () => {
    // await handleLogout(); // Firebase logout
    navigate('/login');
  };
  
  const isActive = (path) => {
      const currentPath = location.pathname.split('/').pop() || '';
      const targetPath = path || '';
      
      if (path === '' && location.pathname.endsWith('/dashboard')) return true;
      
      return currentPath === targetPath;
  };

  // Framer Motion Variants for Animation
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const textVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut", 
        delay: 0.3 
      } 
    }
  };


  return (
    <div className="flex min-h-screen font-sans text-white bg-gray-900">
        
      {/* 1. Animated Sidebar */}
      <div 
        className={`fixed z-30 flex flex-col h-screen bg-gray-800 shadow-xl transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} border-r border-indigo-900`}
      >
        {/* Logo/Header Area */}
        <div className="flex items-center justify-between h-20 p-4 border-b border-indigo-900">
          <div className={`text-xl font-extrabold text-blue-400 overflow-hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
            STUDENT PORTAL
          </div>
          {/* Toggle Button (Visible on all sizes) */}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white rounded-full hover:text-blue-400 hover:bg-gray-700">
            {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => { navigate(`/dashboard/${item.path}`); isSidebarOpen && setIsSidebarOpen(false); }}
                  className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors duration-200 group 
                    ${isActive(item.path) 
                      ? 'bg-indigo-600 shadow-lg text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                    }`}
                >
                  <span className="mr-3 text-xl">{item.icon === '🏠' ? <FaTachometerAlt /> : item.icon}</span>
                  <span className={`font-medium whitespace-nowrap overflow-hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout Button (Bottom) */}
        <div className="p-4 border-t border-indigo-900">
             <button
                onClick={onLogout}
                className="flex items-center w-full px-4 py-3 font-semibold text-red-400 transition-colors duration-200 bg-gray-700 shadow-md rounded-xl hover:bg-red-800 hover:text-white"
            >
                <FaSignOutAlt className="mr-3 text-xl" />
                <span className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                    Logout
                </span>
            </button>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div 
        className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
          {/* Header/Greeting Bar (Placeholder for main content) */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-gray-900 border-b border-indigo-900 shadow-2xl">
              <div>
                  <h1 className="text-3xl font-extrabold text-white">
                      Welcome Back, {studentName}!
                  </h1>
              </div>
          </div>
          
          {/* Dynamic Content Display Area */}
          <main className="p-4 sm:p-8">
              {isActive('') ? (
                  // 👈 NEW: Animated 3D Welcome Message
                  <motion.div
                      className="p-10 mt-4 text-center transform bg-gradient-to-br from-indigo-800 to-purple-900 rounded-3xl shadow-3xl perspective-1000 rotate-x-2 translate-z-10"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                  >
                      <motion.h2 
                          className="relative z-10 text-5xl font-black text-blue-300 animate-pulse-slow"
                          variants={textVariants}
                      >
                          Welcome Back, <span className="text-pink-400 drop-shadow-lg">{studentName}!</span>
                      </motion.h2>
                      <motion.p 
                          className="mt-5 text-xl text-gray-200"
                          variants={textVariants}
                      >
                          Explore your academic journey and tools on the left.
                      </motion.p>
                      
                      {/* Optional: Add a subtle animated background blob for extra flair */}
                      <div className="absolute inset-0 z-0 opacity-20">
                          <div className="absolute w-48 h-48 bg-blue-500 rounded-full top-1/4 left-1/4 mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                          <div className="absolute w-56 h-56 bg-purple-500 rounded-full bottom-1/3 right-1/4 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                      </div>
                  </motion.div>
              ) : (
                  <Outlet /> // Renders the content of the matched route (e.g., ResultsPage)
              )}
          </main>
      </div>
    </div>
  );
};

export default Dashboard;