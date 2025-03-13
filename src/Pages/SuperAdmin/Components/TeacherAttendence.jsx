import { useMemo } from "react"
import { Calendar, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"




const TeacherAttendence = ({teacher}) => {

    const attendanceRate = useMemo(() => {
        const totalDays = teacher.presentDays.length + teacher.absentDays.length
        if (totalDays === 0) return 0
        return Math.round((teacher.presentDays.length / totalDays) * 100)
      }, [teacher])


      const monthlyAttendance = useMemo(() => {
        // Create a map of months with present and absent counts
        const months = {
          Jan: { month: "Jan", present: 0, absent: 0 },
          Feb: { month: "Feb", present: 0, absent: 0 },
          Mar: { month: "Mar", present: 0, absent: 0 },
          Apr: { month: "Apr", present: 0, absent: 0 },
          May: { month: "May", present: 0, absent: 0 },
          Jun: { month: "Jun", present: 0, absent: 0 },
          Jul: { month: "Jul", present: 0, absent: 0 },
          Aug: { month: "Aug", present: 0, absent: 0 },
          Sep: { month: "Sep", present: 0, absent: 0 },
          Oct: { month: "Oct", present: 0, absent: 0 },
          Nov: { month: "Nov", present: 0, absent: 0 },
          Dec: { month: "Dec", present: 0, absent: 0 },
        }
    
        
        teacher.presentDays.forEach((dateStr) => {
          const date = new Date(dateStr)
          const monthName = date.toLocaleString("default", { month: "short" })
          if (months[monthName]) {
            months[monthName].present++
          }
        })
    
       
        teacher.absentDays.forEach((dateStr) => {
          const date = new Date(dateStr)
          const monthName = date.toLocaleString("default", { month: "short" })
          if (months[monthName]) {
            months[monthName].absent++
          }
        })
    
        
        return Object.values(months)
      }, [teacher])

      const recentAttendance = useMemo(() => {
        
        const allDates = [
          ...teacher.presentDays.map((date) => ({ date, status: "present" })),
          ...teacher.absentDays.map((date) => ({ date, status: "absent" })),
        ]
    
        
        allDates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
      
        return allDates.slice(0, 10).reverse()
      }, [teacher])


  return (
    <>
    <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${attendanceRate}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">{teacher.presentDays.length}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
              <div className="text-2xl font-bold">{teacher.absentDays.length}</div>
            </div>
          </CardContent>
        </Card>

        </div>

        <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyAttendance}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="present" stroke="#10b981" activeDot={{ r: 8 }} name="Present Days" />
                <Line type="monotone" dataKey="absent" stroke="#ef4444" name="Absent Days" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAttendance.map((record, index) => {
              const date = new Date(record.date)
              const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })

              return (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formattedDate}</span>
                  </div>
                  {record.status === "present" ? (
                    <div className="flex items-center gap-1 text-green-500">
                      <CheckCircle className="h-4 w-4" />
                      <span>Present</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-500">
                      <XCircle className="h-4 w-4" />
                      <span>Absent</span>
                    </div>
                  )}
                </div>
              )
            })}

            {recentAttendance.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Attendance Records</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  There are no attendance records available for this teacher.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>



        </div>
    
    
    </>
  )
}

export default TeacherAttendence
