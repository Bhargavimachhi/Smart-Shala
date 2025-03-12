
import { useState, useMemo } from "react"
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const data = [
  {
    id: "S001",
    name: "Oakwood High",
    address: "123 Elm Street, Urban City",
    month: "2025-01",
    "avg grade of students": 85.5,
    "pass percentage": 92.3,
    "attendance-rate(student)": 88.7,
    "attendance-rate(teacher)": 95.2,
    "available teacher count": 25,
  },
  {
    id: "S001",
    name: "Oakwood High",
    address: "123 Elm Street, Urban City",
    month: "2025-02",
    "avg grade of students": 86.0,
    "pass percentage": 93.1,
    "attendance-rate(student)": 89.0,
    "attendance-rate(teacher)": 94.8,
    "available teacher count": 25,
  },
  {
    id: "S002",
    name: "Pine Ridge",
    address: "456 Pine Road, Rural Town",
    month: "2025-01",
    "avg grade of students": 78.2,
    "pass percentage": 85.6,
    "attendance-rate(student)": 82.4,
    "attendance-rate(teacher)": 93.0,
    "available teacher count": 20,
  },
  {
    id: "S002",
    name: "Pine Ridge",
    address: "456 Pine Road, Rural Town",
    month: "2025-02",
    "avg grade of students": 79.0,
    "pass percentage": 86.0,
    "attendance-rate(student)": 83.0,
    "attendance-rate(teacher)": 93.5,
    "available teacher count": 20,
  },
  {
    id: "S003",
    name: "Maple Grove",
    address: "789 Maple Lane, Urban City",
    month: "2025-01",
    "avg grade of students": 90.1,
    "pass percentage": 95.0,
    "attendance-rate(student)": 91.2,
    "attendance-rate(teacher)": 97.5,
    "available teacher count": 30,
  },
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState("all")
  const [selectedSchool, setSelectedSchool] = useState("all")


  const months = useMemo(() => [...new Set(data.map((item) => item.month))], [])
  const schools = useMemo(() => [...new Set(data.map((item) => item.name))], [])

 
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        (selectedMonth === "all" || item.month === selectedMonth) &&
        (selectedSchool === "all" || item.name === selectedSchool),
    )
  }, [selectedMonth, selectedSchool])


  const latestMonth = useMemo(() => {
    return months.sort().pop() || ""
  }, [months])


  const latestMonthData = useMemo(() => {
    return data.filter((item) => item.month === latestMonth)
  }, [latestMonth])


  const schoolGradeData = useMemo(() => {
    const result = []
    const schoolsMap = new Map()

    latestMonthData.forEach((item) => {
      schoolsMap.set(item.name, item["avg grade of students"])
    })

    schoolsMap.forEach((grade, name) => {
      result.push({ name, grade })
    })

    return result
  }, [latestMonthData])


  const schoolGradePieData = useMemo(() => {
    const result = []
    const schoolsMap = new Map()

    data.forEach((item) => {
      const currentGrade = schoolsMap.get(item.name) || 0
      const count = schoolsMap.get(`${item.name}_count`) || 0

      schoolsMap.set(item.name, currentGrade + item["avg grade of students"])
      schoolsMap.set(`${item.name}_count`, count + 1)
    })

    schoolsMap.forEach((value, key) => {
      if (!key.includes("_count")) {
        const count = schoolsMap.get(`${key}_count`)
        result.push({
          name: key,
          value: value / count,
        })
      }
    })

    return result
  }, [data])

  
  const monthlyTrendsData = useMemo(() => {
    const result = []
    const monthsMap = new Map()

    data.forEach((item) => {
      const currentGrade = monthsMap.get(item.month)?.grade || 0
      const count = monthsMap.get(item.month)?.count || 0

      monthsMap.set(item.month, {
        grade: currentGrade + item["avg grade of students"],
        count: count + 1,
      })
    })

    monthsMap.forEach((value, month) => {
      result.push({
        month,
        avgGrade: value.grade / value.count,
      })
    })

    return result.sort((a, b) => a.month.localeCompare(b.month))
  }, [data])

 
  const passFailData = useMemo(() => {
    if (selectedSchool === "all") {
      return [
        {
          name: "Pass",
          value: schools[0] ? data.find((item) => item.name === schools[0])?.["pass percentage"] || 0 : 0,
        },
        {
          name: "Fail",
          value: schools[0] ? 100 - (data.find((item) => item.name === schools[0])?.["pass percentage"] || 0) : 0,
        },
      ]
    }

    const schoolData = data.find((item) => item.name === selectedSchool)
    return [
      { name: "Pass", value: schoolData?.["pass percentage"] || 0 },
      { name: "Fail", value: 100 - (schoolData?.["pass percentage"] || 0) },
    ]
  }, [selectedSchool, schools, data])


  const overallData = useMemo(() => {
    let totalGrade = 0
    let totalStudentAttendance = 0
    let totalTeacherAttendance = 0
    let count = 0

    data.forEach((item) => {
      totalGrade += item["avg grade of students"]
      totalStudentAttendance += item["attendance-rate(student)"]
      totalTeacherAttendance += item["attendance-rate(teacher)"]
      count++
    })

    return [
      { name: "Avg Grade", value: totalGrade / count },
      { name: "Student Attendance", value: totalStudentAttendance / count },
      { name: "Teacher Attendance", value: totalTeacherAttendance / count },
    ]
  }, [data])
  const regionData = useMemo(() => {
    const urbanSchools = []
    const ruralSchools = []

    data.forEach((item) => {
      if (item.address.includes("Urban")) {
        urbanSchools.push(item)
      } else if (item.address.includes("Rural")) {
        ruralSchools.push(item)
      }
    })

    const urbanAvg =
      urbanSchools.reduce((sum, item) => sum + item["avg grade of students"], 0) / (urbanSchools.length || 1)
    const ruralAvg =
      ruralSchools.reduce((sum, item) => sum + item["avg grade of students"], 0) / (ruralSchools.length || 1)

    return [
      { name: "Urban", grade: urbanAvg },
      { name: "Rural", grade: ruralAvg },
    ]
  }, [data])


  const attendanceData = useMemo(() => {
    const result = []
    const schoolsMap = new Map()

    latestMonthData.forEach((item) => {
      schoolsMap.set(item.name, {
        studentAttendance: item["attendance-rate(student)"],
        teacherAttendance: item["attendance-rate(teacher)"],
      })
    })

    schoolsMap.forEach((attendance, name) => {
      result.push({
        name,
        studentAttendance: attendance.studentAttendance,
        teacherAttendance: attendance.teacherAttendance,
      })
    })

    return result
  }, [latestMonthData])


  const schoolRankingData = useMemo(() => {
    const schoolPerformance = new Map()

    schools.forEach((school) => {
      const schoolData = data.filter((item) => item.name === school)
      const avgGrade = schoolData.reduce((sum, item) => sum + item["avg grade of students"], 0) / schoolData.length
      const avgPassPercentage = schoolData.reduce((sum, item) => sum + item["pass percentage"], 0) / schoolData.length

      schoolPerformance.set(school, {
        name: school,
        avgGrade,
        passPercentage: avgPassPercentage,
      })
    })

    const sortedSchools = Array.from(schoolPerformance.values()).sort((a, b) => b.avgGrade - a.avgGrade)

    const topSchools = sortedSchools.slice(0, 5)
    const bottomSchools = sortedSchools.slice(-5).reverse()

    return { topSchools, bottomSchools }
  }, [schools, data])

  
  const teacherData = useMemo(() => {
    return latestMonthData.map((item) => ({
      name: item.name,
      teacherCount: item["available teacher count"],
    }))
  }, [latestMonthData])

  return (
    <div className="w-full min-h-screen bg-background p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
    
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 truncate">
          Super Admin Dashboard - Data Analytics
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="w-full sm:w-1/2 md:w-1/4">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4">
            <Select value={selectedSchool} onValueChange={setSelectedSchool}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select School" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Schools</SelectItem>
                {schools.map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
       
        <Card className="md:col-span-2 w-full">
  <CardHeader className="p-3 sm:p-4 lg:p-6">
    <CardTitle className="text-base sm:text-lg lg:text-xl truncate">School-Wise Grade Comparison</CardTitle>
  </CardHeader>
  <CardContent className="p-2 sm:p-4 h-64 sm:h-80 md:h-96 lg:h-[30rem]">
    <ChartContainer
      config={{
        grade: {
          label: "Average Grade",
          color: "hsl(var(--chart-1))",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={schoolGradeData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => (value.length > 10 ? `${value.substring(0, 10)}...` : value)}
          />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="grade" fill="var(--color-grade)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  </CardContent>
</Card>

      
        <Card className="w-full">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl truncate">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 h-48 sm:h-64 md:h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={schoolGradePieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={({ cx }) => Math.min(cx * 0.6, 80)}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name.substring(0, 8)}...: ${(percent * 100).toFixed(0)}%`}
                >
                  {schoolGradePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toFixed(2)} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: "10px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Row 2, Col 1: Monthly Performance Trends (Line Chart) */}
        <Card className="w-full">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl truncate">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 h-48 sm:h-64 md:h-72 lg:h-80">
            <ChartContainer
              config={{
                avgGrade: {
                  label: "Average Grade",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendsData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 10 }} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="avgGrade" stroke="var(--color-avgGrade)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Row 2, Col 2: School-Wise Pass/Fail Percentage (Pie Chart) */}
        <Card className="w-full">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl truncate">Pass/Fail Percentage</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 h-48 sm:h-64 md:h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={passFailData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={({ cx }) => Math.min(cx * 0.6, 80)}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="#4CAF50" />
                  <Cell fill="#F44336" />
                </Pie>
                <Tooltip formatter={(value) => value.toFixed(2) + "%"} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Row 2-3, Col 3: Top 5 & Bottom 5 Schools (Leaderboard Table) */}
        <Card className="row-span-2 w-full">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl truncate">School Performance Ranking</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 overflow-auto">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2">Top Performing Schools</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Rank</TableHead>
                      <TableHead className="text-xs sm:text-sm">School</TableHead>
                      <TableHead className="text-xs sm:text-sm">Grade</TableHead>
                      <TableHead className="text-xs sm:text-sm">Pass %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schoolRankingData.topSchools.map((school, index) => (
                      <TableRow key={school.name}>
                        <TableCell className="text-xs sm:text-sm py-1 sm:py-2">{index + 1}</TableCell>
                        <TableCell className="text-xs sm:text-sm py-1 sm:py-2 max-w-[100px] truncate">
                          {school.name}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-1 sm:py-2">{school.avgGrade.toFixed(1)}</TableCell>
                        <TableCell className="text-xs sm:text-sm py-1 sm:py-2">
                          {school.passPercentage.toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2">Bottom Performing Schools</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Rank</TableHead>
                      <TableHead className="text-xs sm:text-sm">School</TableHead>
                      <TableHead className="text-xs sm:text-sm">Grade</TableHead>
                      <TableHead className="text-xs sm:text-sm">Pass %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schoolRankingData.bottomSchools.map((school, index) => (
                      <TableRow key={school.name}>
                        <TableCell className="text-xs sm:text-sm py-1 sm:py-2">{schools.length - index}</TableCell>
                        <TableCell className="text-xs sm:text-sm py-1 sm:py-2 max-w-[100px] truncate">
                          {school.name}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm py-1 sm:py-2">{school.avgGrade.toFixed(1)}</TableCell>
                        <TableCell className="text-xs sm:text-sm py-1 sm:py-2">
                          {school.passPercentage.toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Row 3, Col 1: Region-Wise Grade Categories (Bar Graph) */}
        <Card className="w-full">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl truncate">Urban vs Rural Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 h-48 sm:h-64 md:h-72 lg:h-80">
            <ChartContainer
              config={{
                grade: {
                  label: "Average Grade",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="grade" fill="var(--color-grade)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl truncate">School-Wise Attendance</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 h-48 sm:h-64 md:h-72 lg:h-80">
            <ChartContainer
              config={{
                studentAttendance: {
                  label: "Student Attendance",
                  color: "hsl(var(--chart-1))",
                },
                teacherAttendance: {
                  label: "Teacher Attendance",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => (value.length > 8 ? `${value.substring(0, 8)}...` : value)}
                  />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Bar dataKey="studentAttendance" fill="var(--color-studentAttendance)" radius={4} />
                  <Bar dataKey="teacherAttendance" fill="var(--color-teacherAttendance)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 w-full">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl truncate">Teacher Availability Report</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
              {teacherData.map((item) => (
                <div key={item.name} className="flex justify-between items-center p-2 sm:p-4 border rounded-lg">
                  <span className="font-medium text-xs sm:text-sm truncate mr-2">{item.name}</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap">
                    {item.teacherCount} teachers
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        
        <Card className="md:col-span-3 w-full">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl truncate">Overall Grade and Attendance</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 h-48 sm:h-64 md:h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={overallData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={({ cx }) => Math.min(cx * 0.4, 100)}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                >
                  {overallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toFixed(2) + "%"} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: "10px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

