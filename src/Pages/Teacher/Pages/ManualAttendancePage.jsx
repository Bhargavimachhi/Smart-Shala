import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const ManualAttendancePage = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    async function fetchClassrooms() {
      if (savedAuth && savedAuth.id) {
        const res = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}/manual-attendance`);
        setClassrooms(res.data.classrooms);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    fetchClassrooms();
  }, [savedAuth]);

  const handleClassroomClick = (classroomId) => {
    navigate(`/teacher/classrooms/${classroomId}/manual-attendance`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manual Attendance</h1>
          <p className="text-gray-500 text-sm">Select a classroom to manage attendance records</p>
          <div className="border-b-2 border-gray-200 mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {classrooms.map((classroom) => (
            <div
              key={classroom._id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleClassroomClick(classroom._id)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 14v3m4-3v3m4-3V9M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{classroom.name}</h3>
                  <p className="text-sm text-gray-500">Click to manage attendance</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400 hover:text-blue-500 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManualAttendancePage;