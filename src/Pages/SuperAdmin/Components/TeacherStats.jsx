
import { useMemo } from "react"
import { Users, BookOpen, School, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts"

import React from 'react'
import { useUserContext } from "@/context/userContext"

const TeacherStats = ({teachers}) => {
    const { userData } = useUserContext();

    const totalteachers = teachers.length;

    // I am calucating the teacher by keeping the teacher counter.
    const totalClassrooms = useMemo(() => {
        return teachers.reduce((teachercounter, teacher) => teachercounter + teacher.classrooms.length, 0)
      }, [teachers])
    

      // Same for school
      const uniqueSchools = useMemo(() => {
        return new Set(teachers.map((teacher) => teacher.school.id)).size
      }, [teachers])



     
      const averageAttendance = useMemo(() => {
        if (teachers.length === 0) return 0
    
        const totalAttendancePercentage = teachers.reduce((acc, teacher) => {
          const totalDays = teacher.presentDays.length + teacher.absentDays.length
          if (totalDays === 0) return acc
          return acc + teacher.presentDays.length / totalDays
        }, 0)
    
        return Math.round((totalAttendancePercentage / teachers.length) * 100)
      }, [teachers])
    
      const subjectDistribution = useMemo(() => {
        const subjects= {}
    
        teachers.forEach((teacher) => {
          teacher.subjects.forEach((subject) => {
            if (subjects[subject]) {
              subjects[subject]++
            } else {
              subjects[subject] = 1
            }
          })
        })
    
        return Object.entries(subjects)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5)
      }, [teachers])

      const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]
    




  return (
    <>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

    <Card className="text-blue-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
          <Users className="h-4 w-4 " />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalteachers}</div>
          <p className="text-xs ">Across {uniqueSchools} schools</p>
        </CardContent>
      </Card>

      <Card className="text-green-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Classrooms</CardTitle>
          <BookOpen className="h-4 w-4 " />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClassrooms}</div>
          <p className="text-xs">
            {(totalClassrooms / totalteachers).toFixed(1)} classrooms per teacher
          </p>
        </CardContent>
      </Card>

      <Card className="text-yellow-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Schools</CardTitle>
          <School className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userData?.schools?.length}</div>
        </CardContent>
      </Card>

      <Card className="text-orange-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
          <CheckCircle className="h-4 w-4 " />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageAttendance}%</div>
          <div className="mt-1 h-2 w-full rounded-full">
            <div className="h-2 rounded-full bg-orange-600" style={{ width: `${averageAttendance}%` }} />
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Subject Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectDistribution}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Teachers">
                  {subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>






    </div>
    
    
    </>
  )
}

export default TeacherStats