import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const StudentAnalyticsPage = () => {
    const { studentId } = useParams();
    const [analytics, setAnalytics] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const response = await axios.get(`http://localhost:3000/student/${studentId}/analytics`);
                setAnalytics(response.data.analytics);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            }
        }
        fetchAnalytics();
    }, [studentId]);

    if (!analytics) {
        return <div>Loading...</div>;
    }

    const pieChartStyle = {
        width: '100%',
        height: 300,
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Student Analytics</h1>
                    <p className="text-gray-600">Overview of student's performance metrics</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Attendance</h2>
                        <ResponsiveContainer {...pieChartStyle}>
                            <PieChart>
                                <Pie
                                    data={analytics.attendance}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {analytics.attendance.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Homeworks</h2>
                        <ResponsiveContainer {...pieChartStyle}>
                            <PieChart>
                                <Pie
                                    data={analytics.homeworks}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {analytics.homeworks.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentAnalyticsPage;