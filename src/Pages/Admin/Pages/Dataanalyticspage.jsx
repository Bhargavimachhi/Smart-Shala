import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { User, BookOpen, Database, Calendar, PieChart as PieChartIcon } from 'lucide-react';
import SideNavbar from '../../../components/SideNavbar';

const Dataanalyticspage = () => {

    const classParticipation = [
        { name: 'Active', value: 65 },
        { name: 'Moderate', value: 25 },
        { name: 'Low', value: 10 }
      ];
    
      const attendance = [
        { name: 'Present', value: 85 },
        { name: 'Absent', value: 10 },
        { name: 'Late', value: 5 }
      ];
    
      const behavior = [
        { name: 'Excellent', value: 45 },
        { name: 'Good', value: 35 },
        { name: 'Fair', value: 15 },
        { name: 'Needs Improvement', value: 5 }
      ];
    
      const extraCurricular = [
        { name: 'Sports', value: 30 },
        { name: 'Arts', value: 25 },
        { name: 'Clubs', value: 25 },
        { name: 'None', value: 20 }
      ];
    
      const criticalThinking = [
        { name: 'Advanced', value: 35 },
        { name: 'Proficient', value: 40 },
        { name: 'Developing', value: 20 },
        { name: 'Basic', value: 5 }
      ];
    
      const other = [
        { name: 'Leadership', value: 30 },
        { name: 'Teamwork', value: 35 },
        { name: 'Communication', value: 25 },
        { name: 'Initiative', value: 10 }
      ];
    
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
    
  
      const pieChartStyle = {
        width: '100%',
        height: 300,
      };
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
         
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Class Participation</h2>
            <ResponsiveContainer {...pieChartStyle}>
              <PieChart>
                <Pie
                  data={classParticipation}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {classParticipation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Attendance</h2>
            <ResponsiveContainer {...pieChartStyle}>
              <PieChart>
                <Pie
                  data={attendance}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Behavior and Discipline */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Behavior & Discipline</h2>
            <ResponsiveContainer {...pieChartStyle}>
              <PieChart>
                <Pie
                  data={behavior}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {behavior.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Extra Curricular */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Extra Curricular Activities</h2>
            <ResponsiveContainer {...pieChartStyle}>
              <PieChart>
                <Pie
                  data={extraCurricular}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {extraCurricular.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Critical Thinking */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Critical Thinking</h2>
            <ResponsiveContainer {...pieChartStyle}>
              <PieChart>
                <Pie
                  data={criticalThinking}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {criticalThinking.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Other Skills */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Other Skills</h2>
            <ResponsiveContainer {...pieChartStyle}>
              <PieChart>
                <Pie
                  data={other}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {other.map((entry, index) => (
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


    
    
    </>
  )
}

export default Dataanalyticspage