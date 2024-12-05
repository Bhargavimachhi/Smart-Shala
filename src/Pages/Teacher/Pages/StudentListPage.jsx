import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const StudentListPage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const savedAuth = JSON.parse(localStorage.getItem("auth"));

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await axios.get(`http://localhost:3000/teacher/${savedAuth.id}/students`);
                setStudents(response.data.students);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }
        fetchStudents();
    }, [savedAuth.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Students</h1>
                    <p className="text-gray-600">Select a student to view their analytics</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map((student) => (
                        <div key={student._id} className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-2">{student.name}</h2>
                            <p className="text-gray-600 mb-4">{student.email}</p>
                            <Link to={`/teacher/student/${student._id}/analytics`} className="text-blue-500 hover:underline">
                                View Analytics
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentListPage;