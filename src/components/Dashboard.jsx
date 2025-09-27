import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt, FaTachometerAlt, FaCode, FaBook, FaGlobe, FaUserCircle } from 'react-icons/fa'; // 🔑 Added FaUserCircle
import { motion } from 'framer-motion'; 
import Particles from 'react-tsparticles'; 
import { handleLogout } from '../firebase'; 

// 🔑 Import your Memoji avatar image
import MemojiAvatar from '../assets/memoji_avatar.png'; // <--- ASSUME THIS PATH & FILENAME


const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const studentName = "Jerine Joshwa"; 

  // 🔑 NAVIGATION DATA (Profile added to the sidebar list)
  const navItems = [
    { name: "Dashboard", path: "", icon: "🏠", baseRoute: true },
    { name: "Profile", path: "profile", icon: "👤" }, // 🔑 ADDED PROFILE LINK
    { name: "Results", path: "results", icon: "📊" },
    { name: "Assignments", path: "assignments", icon: "📝" },
    { name: "Attendance", path: "attendance", icon: "🗓️" },
    { name: "Academic To-Dos", path: "todo", icon: "✅" },
    { name: "Calendar", path: "calendar", icon: "📅" },
    { name: "Mind Games", path: "games", icon: "🎮" },
  ];

  const onLogout = async () => { navigate('/login'); };
  
  const isActive = (path) => {
      const currentPath = location.pathname.split('/').pop() || '';
      if (path === '' && location.pathname.endsWith('/dashboard')) return true;
      return currentPath === (path || '');
  };

  // Framer Motion Variants (Unchanged)
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const textVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } }
  };

  const avatarVariants = {
      animate: {
          scale: [1, 1.05, 1],
          boxShadow: [
              "0 0 10px #7c3aed, 0 0 20px #7c3aed",
              "0 0 15px #c084fc, 0 0 30px #c084fc",
              "0 0 10px #7c3aed, 0 0 20px #7c3aed"
          ],
          transition: { duration: 4, ease: "easeInOut", repeat: Infinity }
      }
  };
  
  const floatingIconVariants = {
      start: { y: 0, opacity: 0.5 },
      end: { 
          y: [0, -15, 0], 
          opacity: 1, 
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } 
      }
  };


  return (
    <div className="flex min-h-screen font-sans text-white bg-gray-900">
        
      {/* COSMIC BACKGROUND LAYER */}
      <Particles
        className="absolute inset-0 z-0"
        id="tsparticles-dashboard"
        options={{
          background: { color: { value: "#0A0B1A" } }, 
          particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "star" }, 
            opacity: { value: 0.7, random: true },
            size: { value: 1.5, random: true, anim: { enable: true, speed: 0.5, size_min: 0.5, sync: false } },
            line_linked: { enable: false },
            move: { enable: true, speed: 0.5, direction: "none", random: true, out_mode: "out", bounce: false }
          },
          interactivity: { events: { onhover: { enable: true, mode: "bubble" }, onclick: { enable: true, mode: "repulse" }, resize: true }, modes: { bubble: { distance: 200, size: 5, duration: 2, opacity: 1, speed: 3 } } },
          retina_detect: true,
        }}
      />
      
      {/* 1. Animated Sidebar */}
      <div 
        className={`fixed z-30 flex flex-col h-screen bg-gray-800 shadow-xl transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} border-r border-indigo-900`}
      >
        {/* Logo/Header Area */}
        <div className="flex items-center justify-between h-20 p-4 border-b border-indigo-900">
          <div className={`text-xl font-extrabold text-blue-400 overflow-hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>STUDENT PORTAL</div>
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
                    ${isActive(item.path) ? 'bg-indigo-600 shadow-lg text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'}`}
                >
                  {/* 🔑 Logic for Profile Icon */}
                  <span className="mr-3 text-xl">{item.name === 'Profile' ? <FaUserCircle /> : item.icon === '🏠' ? <FaTachometerAlt /> : item.icon}</span> 
                  <span className={`font-medium whitespace-nowrap overflow-hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout Button (Bottom) */}
        <div className="p-4 border-t border-indigo-900">
             <button onClick={onLogout} className="flex items-center w-full px-4 py-3 font-semibold text-red-400 transition-colors duration-200 bg-gray-700 shadow-md rounded-xl hover:bg-red-800 hover:text-white">
                <FaSignOutAlt className="mr-3 text-xl" />
                <span className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>Logout</span>
            </button>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div 
        className={`flex-1 z-10 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
          {/* Sticky Header/Greeting Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-gray-900 border-b border-indigo-900 shadow-2xl">
              <div>
                  <h1 className="text-3xl font-extrabold text-white">
                      Welcome Back, {studentName}!
                  </h1>
              </div>
              
              {/* 🔑 PROFILE BUTTON (Top Right Corner - Assuming you prefer this external button) */}
              <button
                  onClick={() => navigate('/dashboard/profile')}
                  className="p-3 text-white transition-colors duration-200 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="View Profile"
              >
                  <FaUserCircle className="w-6 h-6" />
              </button>
          </div>
          
          {/* Dynamic Content Display Area */}
          <main className="p-4 sm:p-8">
              {isActive('') ? (
                  // ANIMATED Welcome Container
                  <motion.div
                      className="p-10 mt-4 overflow-hidden transform bg-gradient-to-br from-indigo-800 to-purple-900 rounded-3xl shadow-3xl perspective-1000 translate-z-10"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                  >
                      {/* Floating Icons and Avatar */}
                      <motion.div variants={floatingIconVariants} initial="start" animate="end" className="absolute text-3xl text-blue-300 top-8 right-8 opacity-80" style={{ rotate: 15 }}><FaCode /></motion.div>
                      <motion.div variants={floatingIconVariants} initial="start" animate="end" className="absolute text-3xl text-pink-300 bottom-10 left-10 opacity-80" style={{ delay: 1, rotate: -20 }}><FaBook /></motion.div>
                      <motion.div variants={floatingIconVariants} initial="start" animate="end" className="absolute text-3xl text-green-300 top-1/2 left-10 opacity-80" style={{ delay: 2.5, rotate: 5 }}><FaGlobe /></motion.div>


                      <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:space-x-12 md:space-y-0">
                          
                          {/* 3D MEMOJI AVATAR */}
                          <motion.div 
                              className="relative flex items-center justify-center w-32 h-32 overflow-hidden rounded-full shadow-2xl" 
                              variants={avatarVariants}
                              animate="animate"
                          >
                              <img src={MemojiAvatar} alt="Student Avatar" className="object-cover w-full h-full" /> 
                          </motion.div>

                          {/* ANIMATED TEXT */}
                          <div className="text-center md:text-left">
                              <motion.h2 
                                  className="relative z-10 text-5xl font-black text-blue-300 drop-shadow-lg"
                                  variants={textVariants}
                              >
                                  Welcome Back, <span className="text-pink-400 drop-shadow-lg">{studentName}!</span>
                              </motion.h2>
                              <motion.p 
                                  className="mt-3 text-xl text-gray-200"
                                  variants={textVariants}
                              >
                                  Your portal to academic success is open. Select a tool from the sidebar.
                              </motion.p>
                          </div>
                      </div>
                      
                      {/* SUBTLE STAT CARD */}
                      <motion.div 
                          className="absolute p-3 bg-white border border-gray-600 shadow-md bottom-5 right-5 bg-opacity-10 rounded-xl backdrop-blur-md"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: 1.5 } }}
                      >
                          <p className="text-sm font-semibold text-yellow-300">⭐ Week 4 Streak Active</p>
                          <p className="text-xs text-gray-400">100% assignment submission rate!</p>
                      </motion.div>
                      
                      {/* Animated Background Blobs */}
                      <div className="absolute inset-0 z-0 opacity-20">
                          <div className="absolute w-48 h-48 bg-blue-500 rounded-full top-1/4 left-1/4 mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                          <div className="absolute w-56 h-56 bg-purple-500 rounded-full bottom-1/3 right-1/4 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                      </div>
                  </motion.div>
              ) : (
                  <Outlet /> 
              )}
          </main>
      </div>
    </div>
  );
};

export default Dashboard;