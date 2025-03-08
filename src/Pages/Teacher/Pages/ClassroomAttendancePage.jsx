import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';
import toast from 'react-hot-toast';

const ClassroomAttendancePage = () => {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    async function fetchStudents() {
      const savedAuth = JSON.parse(localStorage.getItem("auth"));
      if (savedAuth && savedAuth.id) {
        const res = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}/classrooms/${classroomId}/manual-attendance`);
        setStudents(res.data.students);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    fetchStudents();
  }, [classroomId]);

  const markAttendance = async (studentId, status) => {
    try {
      const url = status === 'present' 
        ? `http://localhost:3000/student/${studentId}/attendance/present` 
        : `http://localhost:3000/student/${studentId}/attendance/absent`;
      
      await axios.get(url);
      toast.success('Attendance updated successfully!');
      // Update local state instead of reloading
      setStudents(prev => prev.map(student => 
        student._id === studentId 
          ? { ...student, presentDays: status === 'present' 
              ? [...student.presentDays, new Date().toISOString().split("T")[0]] 
              : student.presentDays.filter(day => day !== new Date().toISOString().split("T")[0]) 
            } 
          : student
      ));
    } catch (error) {
      toast.error('Error updating attendance');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-500 hover:text-blue-600 mb-6"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
                clipRule="evenodd"
              />
            </svg>
            Back to Classrooms
          </button>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Attendance Management</h2>
          <p className="text-gray-500 text-sm">Mark attendance for today's session</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox"
                            className="sr-only peer"
                            checked={student.presentDays.includes(new Date().toISOString().split("T")[0])}
                            onChange={(e) => markAttendance(student._id, e.target.checked ? 'present' : 'absent')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                                          rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white 
                                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                                          after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                                          after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomAttendancePage;