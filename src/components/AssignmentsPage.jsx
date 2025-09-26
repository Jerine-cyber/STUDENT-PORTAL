import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssignmentsPage = () => {
  const navigate = useNavigate();

  // Dummy data for academic assignments
  const studentAssignments = [
    {
      id: 1,
      title: "Data Structures Project",
      subject: "Computer Science II",
      dueDate: "2025-10-15",
      status: "Submitted",
      grade: "A-",
    },
    {
      id: 2,
      title: "Literary Analysis Essay",
      subject: "English Literature",
      dueDate: "2025-10-20",
      status: "Graded",
      grade: "B+",
    },
    {
      id: 3,
      title: "Chemistry Lab Report",
      subject: "Chemistry",
      dueDate: "2025-10-25",
      status: "Pending",
      grade: null,
    },
    {
      id: 4,
      title: "World History Presentation",
      subject: "World History",
      dueDate: "2025-11-05",
      status: "Submitted",
      grade: null,
    },
    {
      id: 5,
      title: "Algorithms Midterm Review",
      subject: "Algorithms",
      dueDate: "2025-11-10",
      status: "Pending",
      grade: null,
    },
  ];

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

  return (
    <div className="relative min-h-screen p-6 overflow-hidden font-sans text-white sm:p-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
      {/* Abstract Background Elements for 3D feel */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute bg-blue-500 rounded-full top-1/4 left-1/4 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute bg-purple-500 rounded-full top-1/2 right-1/4 w-96 h-96 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bg-pink-500 rounded-full bottom-1/4 left-1/3 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
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
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Assignments</h1>
        </div>

        {/* Assignments List */}
        <div className="mt-8 space-y-6">
          {studentAssignments.map((assignment) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;
