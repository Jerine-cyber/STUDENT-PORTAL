import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const navigate = useNavigate();

  // Dummy data for academic results
  const studentResults = {
    name: "Jerine Joshwa",
    id: "23becy018",
    semesters: [
      {
        semester: "Semester 1",
        gpa: 3.85,
        subjects: [
          { name: "Mathematics I", grade: "A", score: 92 },
          { name: "Physics", grade: "A-", score: 88 },
          { name: "Computer Science I", grade: "A", score: 95 },
          { name: "English Literature", grade: "B+", score: 87 },
          { name: "Chemistry", grade: "B", score: 82 },
        ],
      },
      {
        semester: "Semester 2",
        gpa: 4.00,
        subjects: [
          { name: "Mathematics II", grade: "A+", score: 98 },
          { name: "Computer Science II", grade: "A", score: 94 },
          { name: "Data Structures", grade: "A", score: 91 },
          { name: "World History", grade: "A", score: 93 },
        ],
      },
      {
        semester: "Semester 3",
        gpa: 3.75,
        subjects: [
          { name: "Database Systems", grade: "A-", score: 89 },
          { name: "Algorithms", grade: "B+", score: 85 },
          { name: "Operating Systems", grade: "A", score: 90 },
          { name: "Communication Skills", grade: "A", score: 96 },
        ],
      },
    ],
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-400 font-bold';
      case 'A-':
      case 'B+':
        return 'text-blue-400 font-semibold';
      case 'B':
      case 'B-':
        return 'text-yellow-400 font-semibold';
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
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Academic Results</h1>
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
