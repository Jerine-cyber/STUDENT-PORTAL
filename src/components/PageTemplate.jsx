import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageTemplate = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 font-sans sm:p-10 bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="w-full max-w-4xl p-8 transition-all duration-300 transform bg-white shadow-2xl rounded-2xl backdrop-filter backdrop-blur-sm bg-opacity-95">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="p-2 mr-4 text-blue-600 transition-colors duration-200 rounded-full hover:text-blue-800 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">{title}</h1>
        </div>
        <div className="pt-6 mt-6 border-t border-gray-200">
          <p className="text-lg text-gray-700">This is the content for the **{title}** page. This is a placeholder section that you can replace with your specific content, such as a list of results, assignments, or a calendar view.</p>
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
