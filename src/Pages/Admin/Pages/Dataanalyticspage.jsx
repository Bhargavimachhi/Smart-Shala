import React, { useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import SideNavbar from '../../../components/SideNavbar';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const Dataanalyticspage = () => {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [selectedOption, setSelectedOption] = useState('overall');
  const [classrooms, setClassrooms] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getClassrooms() {
    const res = await axios.get(`http://localhost:3000/admin/${savedAuth.id}/classrooms`);
    setClassrooms(res.data.classrooms);
  }

    async function fetchOverallClassroomAttendance() {
      const res = await axios.get(`http://localhost:3000/admin/${savedAuth.id}/classrooms/attendance`);
      setAttendance(res.data.attendance);
      setLoading(false);
    }

    async function fetchClassroomAttendance(index) {
      const res = await axios.get(`http://localhost:3000/classroom/${selectedClassroom}/attendance`);
      setAttendance([{ name : selectedClassroom, value :res.data.average}]);
    }
  
  useEffect(() => {

    getClassrooms();
    fetchOverallClassroomAttendance();
  },[]);

  const handleChange = (event) => {
    console.log(event);
    if(event.target.value == 'overall') {
      setSelectedOption("overall");
      fetchOverallClassroomAttendance();
    }
    else {
      setSelectedOption(event.target.value);
      fetchClassroomAttendance(event.target.value);
    }
  };
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
    
  
      const pieChartStyle = {
        width: '100%',
        height: 300,
      };

      if (loading) {
        return <div className="text-center mt-8">Loading ...</div>;
      }

      console.log(attendance);
  return (
    <>

<div className="flex min-h-screen bg-gray-100">
    
     <SideNavbar/>
     
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Class Analytics</h1>
          <p className="text-gray-600">Comprehensive overview of student performance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Attendance */}
          {
            attendance.map((classroom, index) => {
              return <>
              <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Class : {classroom.name}</h2>
              <p>Attendance Report</p>
              <ResponsiveContainer {...pieChartStyle}>
                <PieChart>
                  <Pie
                    data={[classroom]}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {/* {attendance.map((entry, index) => ( */}
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    {/* ))} */}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            </>
            })
          }
        </div>
      </div>
    </div>


    
    
    </>
  )
}

export default Dataanalyticspage