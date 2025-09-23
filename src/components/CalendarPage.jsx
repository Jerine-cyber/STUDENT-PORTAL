import React from 'react';
import { useNavigate } from 'react-router-dom';

const CalendarPage = () => {
  const navigate = useNavigate();

  // Dummy data for Karpagam College academic calendar.
  const academicCalendar = [
    {
      month: "September 2025",
      events: [
        { date: "Sept 1", event: "Classes Resume" },
        { date: "Sept 5", event: "Teacher's Day" },
        { date: "Sept 20", event: "Continuous Internal Assessment (CIA) - I begins" },
        { date: "Sept 27", event: "Continuous Internal Assessment (CIA) - I ends" },
      ],
    },
    {
      month: "October 2025",
      events: [
        { date: "Oct 2", event: "Gandhi Jayanti" },
        { date: "Oct 15", event: "Half-yearly Examinations begin" },
        { date: "Oct 25", event: "Half-yearly Examinations end" },
        { date: "Oct 28", event: "Diwali Holidays" },
      ],
    },
    {
      month: "November 2025",
      events: [
        { date: "Nov 5", event: "End Semester Examinations start" },
        { date: "Nov 20", event: "End Semester Examinations end" },
        { date: "Nov 25", event: "Even Semester begins" },
      ],
    },
    {
      month: "December 2025",
      events: [
        { date: "Dec 10", event: "Human Rights Day" },
        { date: "Dec 24-26", event: "Christmas Holidays" },
        { date: "Dec 31", event: "Continuous Internal Assessment (CIA) - II begins" },
      ],
    },
  ];

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
          <h1 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">Academic Calendar</h1>
        </div>

        <p className="mb-8 text-lg font-medium text-gray-600">Karpagam College of Engineering - 2025-2026</p>

        <div className="space-y-8">
          {academicCalendar.map((monthData) => (
            <div key={monthData.month} className="p-6 border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
              <h2 className="mb-4 text-xl font-bold text-blue-700">{monthData.month}</h2>
              <ul className="space-y-3">
                {monthData.events.map((event, index) => (
                  <li key={index} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <span className="font-medium text-gray-800">{event.date}</span>
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
