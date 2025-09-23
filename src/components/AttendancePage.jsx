import React from 'react';
import { useNavigate } from 'react-router-dom';

const AttendancePage = () => {
  const navigate = useNavigate();

  // Dummy data for academic attendance
  const studentAttendance = [
    {
      id: 1,
      subject: "Mathematics II",
      classesHeld: 45,
      classesAttended: 42,
    },
    {
      id: 2,
      subject: "Computer Science II",
      classesHeld: 50,
      classesAttended: 48,
    },
    {
      id: 3,
      subject: "Data Structures",
      classesHeld: 40,
      classesAttended: 35,
    },
    {
      id: 4,
      subject: "World History",
      classesHeld: 30,
      classesAttended: 28,
    },
    {
      id: 5,
      subject: "Algorithms",
      classesHeld: 35,
      classesAttended: 25,
    },
  ];

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

  return (
    <div className="relative min-h-screen p-6 overflow-hidden font-sans text-white sm:p-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
      {/* Abstract Background Elements for 3D feel */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute bg-blue-500 rounded-full top-1/4 left-1/4 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bg-purple-500 rounded-full top-1/2 right-1/4 w-96 h-96 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bg-pink-500 rounded-full bottom-1/4 left-1/3 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
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
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Attendance</h1>
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
