
import { useState,useMemo } from "react"
import { Download, FileDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceChart } from "../Components/Performancechart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


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


export default function DashboardContent() {
  const [selectedSchools, setSelectedSchools] = useState([]);

  const schools = useMemo(() => [...new Set(data.map((item) => item.name))], []);


  

  const handleDownloadReport = () => {
    console.log("Report clicked");
   
  }

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
  }, [schools, data]);
  

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">School Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownloadReport(false)}
            
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download Selected
          </Button>
          <Button onClick={() => handleDownloadReport(true)}>
            <Download className="mr-2 h-4 w-4" />
            Download All Reports
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">63</div>
                <p className="text-xs text-muted-foreground">Across all districts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1954</div>
                <p className="text-xs text-muted-foreground">Enrolled in all schools</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">166</div>
                <p className="text-xs text-muted-foreground">Employed across all schools</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">54%</div>
                <p className="text-xs text-muted-foreground">Across all schools</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>School Performance</CardTitle>
                <CardDescription>Top and bottom performing schools based on grades</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <PerformanceChart />
              </CardContent>
            </Card>
            {/* <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Pass Percentage</CardTitle>
                <CardDescription>Schools with highest and lowest pass rates</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceChart />
              </CardContent>
            </Card> */}
            
          </div>
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
        </TabsContent>

       
      </Tabs>
    </div>
  )
}

