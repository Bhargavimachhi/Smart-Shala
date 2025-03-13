import React from 'react'
import { useState,useEffect } from 'react'
import {
    Search,
    Filter,
    Download,
    ChevronDown,
    Users,
    School,
    BookOpen,
    Phone,
    MapPin,
    Calendar,
    CheckCircle,
    XCircle,
  } from "lucide-react"
  import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import TeacherStats from '../Components/TeacherStats';
import TeacherAttendence from '../Components/TeacherAttendence'

const TeacherData = () => {
    const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("all")
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


   const mockSchools = [
    {
      id: "school1",
      name: "Bright School",
      location: "Karlibaug",
      type: "Public",
    },
    {
      id: "school2",
      name: "Shannon School",
      location: "Karlibaug",
      type: "Public",
    },
    {
      id: "school3",
      name: "Parth School",
      location: "Chicago, IL",
      type: "Private",
    },
    {
      id: "school4",
      name: "Rosemary School",
      location: "Miami, FL",
      type: "Public",
    },
    {
      id: "school5",
      name: "Ambe School",
      location: "Austin, TX",
      type: "Charter",
    },
  ];

  const mockTeachers = [
    {
        id: "teacher1",
        email: "john.smith@westview.edu",
        name: "John Smith",
        school: mockSchools[0],
        subjects: ["Mathematics", "Physics"],
        classrooms: [
            {
              id: "classroom1",
              name: "Mathematics 10th Grade",
              grade: "10th Grade",
              subject: "Mathematics",
              studentCount: 25,
              schedule: "Mon/Wed 9:00-10:30",
            },
            {
              id: "classroom2",
              name: "Physics 11th Grade",
              grade: "11th Grade",
              subject: "Physics",
              studentCount: 20,
              schedule: "Tue/Thu 11:00-12:30",
            },
            {
              id: "classroom3",
              name: "Mathematics 12th Grade",
              grade: "12th Grade",
              subject: "Mathematics",
              studentCount: 22,
              schedule: "Mon/Fri 1:00-2:30",
            },
          ],
        homeworks: ["homework1", "homework2", "homework3"],
        contact: "1234567890",
        address: "123 Main St, New York, NY",
        absentDays: ["2024-01-15", "2024-02-10", "2024-03-05", "2024-04-20", "2024-05-25"],
        presentDays:["2024-01-01", "2024-01-02", "2024-01-03"]
      },
      {
        id: "teacher2",
        email: "john2.smith@westview.edu",
        name: "John2 Smith",
        school: mockSchools[1],
        subjects: ["Mathematics", "Physics"],
        classrooms: [
            {
              id: "classroom1",
              name: "Mathematics 10th Grade",
              grade: "10th Grade",
              subject: "Mathematics",
              studentCount: 25,
              schedule: "Mon/Wed 9:00-10:30",
            },
            {
              id: "classroom2",
              name: "Physics 11th Grade",
              grade: "11th Grade",
              subject: "Physics",
              studentCount: 20,
              schedule: "Tue/Thu 11:00-12:30",
            },
            {
              id: "classroom3",
              name: "Mathematics 12th Grade",
              grade: "12th Grade",
              subject: "Mathematics",
              studentCount: 22,
              schedule: "Mon/Fri 1:00-2:30",
            },
          ],
        homeworks: ["homework1", "homework2", "homework3"],
        contact: "1234567890",
        address: "123 Main St, New York, NY",
        absentDays: ["2024-01-15", "2024-02-10", "2024-03-05", "2024-04-20", "2024-05-25"],
        presentDays:["2024-01-01", "2024-01-02", "2024-01-03","2024-04-21", "2024-05-26"]
      },
      {
        id: "Mr Patel",
        email: "john.smith@westview.edu",
        name: "Mr Patel",
        school: mockSchools[2],
        subjects: ["Mathematics", "Physics"],
        classrooms: [
            {
              id: "classroom1",
              name: "Mathematics 10th Grade",
              grade: "10th Grade",
              subject: "Mathematics",
              studentCount: 25,
              schedule: "Mon/Wed 9:00-10:30",
            },
            {
              id: "classroom2",
              name: "Physics 11th Grade",
              grade: "11th Grade",
              subject: "Physics",
              studentCount: 20,
              schedule: "Tue/Thu 11:00-12:30",
            },
            {
              id: "classroom3",
              name: "Mathematics 12th Grade",
              grade: "12th Grade",
              subject: "Mathematics",
              studentCount: 22,
              schedule: "Mon/Fri 1:00-2:30",
            },
          ],
        homeworks: ["homework1", "homework2", "homework3"],
        contact: "1234567890",
        address: "123 Main St, New York, NY",
        absentDays: ["2024-01-15", "2024-02-10", "2024-03-05", "2024-04-20", "2024-05-25"],
        presentDays:["2024-01-01", "2024-01-02", "2024-01-03","2024-01-14", "2024-02-19", "2024-12-05", "2024-04-2", "2024-05-26"]
      },

  ]

  useEffect(()=>{
    setTeachers(mockTeachers);
    setFilteredTeachers(mockTeachers)

  },[]);

  useEffect(() => {
    let result = [...teachers]

   // Forr filtering all the teachers from school
    if (selectedSchool !== "all") {
      result = result.filter((teacher) => teacher.school.id === selectedSchool)
    }

   //Searching badhi school mate
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(query) ||
          teacher.email.toLowerCase().includes(query) ||
          teacher.subjects.some((subject) => subject.toLowerCase().includes(query)),
      )
    }

    setFilteredTeachers(result)
  }, [selectedSchool, searchQuery, teachers])

  
  const handleTeacherSelect = (teacher) => {
    setSelectedTeacher(teacher)
    setIsDialogOpen(true)
  }





  return (
    <>
     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

     <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Teacher Analytics Dashboard</h1>
        <p className="text-muted-foreground">Manage and analyze teacher data across 63 schools</p>
      </div>

      <TeacherStats teachers={filteredTeachers} />

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={selectedSchool} onValueChange={setSelectedSchool}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select School" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Schools</SelectItem>
                {mockSchools.map((school) => (
                  <SelectItem key={school.id} value={school.id}>
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search teachers..."
                className="w-full sm:w-[300px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Teachers</CardTitle>
            <CardDescription>
              Showing {filteredTeachers.length} of {teachers.length} teachers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Subjects</TableHead>
                  <TableHead className="hidden lg:table-cell">Classrooms</TableHead>
                  <TableHead className="hidden lg:table-cell">Attendance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow
                    key={teacher.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleTeacherSelect(teacher)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${teacher.name.charAt(0)}`} />
                          <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{teacher.name}</div>
                          <div className="text-sm text-muted-foreground md:hidden">{teacher.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10">
                        {teacher.school.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{teacher.email}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.slice(0, 2).map((subject, i) => (
                          <Badge key={i} variant="secondary" className="mr-1">
                            {subject}
                          </Badge>
                        ))}
                        {teacher.subjects.length > 2 && <Badge variant="outline">+{teacher.subjects.length - 2}</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{teacher.classrooms.length} classes</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center">
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{
                              width: `${(teacher.presentDays.length / (teacher.presentDays.length + teacher.absentDays.length)) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs">
                          {Math.round(
                            (teacher.presentDays.length / (teacher.presentDays.length + teacher.absentDays.length)) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleTeacherSelect(teacher)
                            }}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit teacher</DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View classrooms</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {selectedTeacher && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Teacher Profile</DialogTitle>
              <DialogDescription>Detailed information about {selectedTeacher.name}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={`/placeholder.svg?height=96&width=96&text=${selectedTeacher.name.charAt(0)}`} />
                      <AvatarFallback className="text-3xl">{selectedTeacher.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{selectedTeacher.name}</h3>
                    <Badge variant="outline" className="bg-primary/10">
                      {selectedTeacher.school.name}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">ID</p>
                        <p className="text-sm text-muted-foreground">{selectedTeacher.id}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <School className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">School</p>
                        <p className="text-sm text-muted-foreground">{selectedTeacher.school.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Subjects</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedTeacher.subjects.map((subject, i) => (
                            <Badge key={i} variant="secondary" className="mr-1">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Contact</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedTeacher.contact ? selectedTeacher.contact : "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedTeacher.address ? selectedTeacher.address : "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Attendance</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{selectedTeacher.presentDays.length} days</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm">{selectedTeacher.absentDays.length} days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="classrooms" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedTeacher.classrooms.map((classroom, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{classroom.name}</CardTitle>
                        <CardDescription>{classroom.grade}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Students:</span>
                            <span className="text-sm font-medium">{classroom.studentCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Subject:</span>
                            <span className="text-sm font-medium">{classroom.subject}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Schedule:</span>
                            <span className="text-sm font-medium">{classroom.schedule}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedTeacher.classrooms.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Classrooms Assigned</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      This teacher doesn't have any classrooms assigned at the moment.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="attendance" className=" space-y-4 pt-4">
                <TeacherAttendence teacher={selectedTeacher} />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
      
    </div>
    
    
    </>
  )
}

export default TeacherData