import React from "react";
import { useState, useEffect } from "react";
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
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import TeacherAttendence from "../Components/TeacherAttendence";
import toast from "react-hot-toast";
import { GradeComponent } from "../Components/GradeComponent";
import { useNavigate } from "react-router-dom";

const StudentDataAnalytics = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [schools, setschools] = useState([]);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudents() {
      try {
        let res = await axios.get(
          `http://localhost:3000/authority/${savedAuth.id}/students`
        );
        let data = [];
        setStudents(res.data.students);
        setschools(
          res.data.students.map((student) => {
            data = [...data, ...student.students];
            return student.schoolName;
          })
        );
        setAllStudents(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchStudents();
  }, []);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredStudents = students
    .map((school) => ({
      ...school,
      students: school.students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (school.schoolName == selectedSchool || selectedSchool == "all")
      ),
    }))
    .filter((school) => school.students.length > 0);

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto py-6 space-y-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Student Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage and analyze student data across your schools
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={selectedSchool} onValueChange={(e) => setSelectedSchool(e)}>
                  <SelectTrigger className="w-full sm:w-[200px]">
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
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search Students..."
                    className="w-full sm:w-[300px] pl-8"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Students</CardTitle>
                <CardDescription>
                  Showing {filteredStudents.reduce((sum, obj) => sum + obj.students.length, 0)} of {allStudents.length}{" "}
                  students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Attendance
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.flatMap((obj) =>
                      obj.students.map((student) => (
                        <>
                          <TableRow
                            key={student.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleStudentSelect(student)}
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage
                                    src={`/placeholder.svg?height=40&width=40&text=${student.name.charAt(
                                      0
                                    )}`}
                                  />
                                  <AvatarFallback>
                                    {student.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {student.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground md:hidden">
                                    {student.email}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {obj?.schoolName}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {student.email}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <div className="flex items-center">
                                <div className="w-full bg-muted rounded-full h-2.5">
                                  <div
                                    className="bg-green-500 h-2.5 rounded-full"
                                    style={{
                                      width: `${
                                        (student.presentDays.length /
                                          (student.presentDays.length +
                                            student.absentDays.length)) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="ml-2 text-xs">
                                  {Math.round(
                                    (student.presentDays.length /
                                      (student.presentDays.length +
                                        student.absentDays.length)) *
                                      100
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
                                      e.stopPropagation();
                                      handleStudentSelect(student);
                                    }}
                                  >
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      navigate(
                                        `/profile/student/${selectedStudent._id}`
                                      );
                                    }}
                                  >
                                    View Profile
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        </>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {selectedStudent && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">Student Profile</DialogTitle>
                  <DialogDescription>
                    Detailed information about {selectedStudent.name}
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 pt-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center md:items-start gap-2">
                        <Avatar className="h-24 w-24">
                          <AvatarImage
                            src={`/placeholder.svg?height=96&width=96&text=${selectedStudent.name.charAt(
                              0
                            )}`}
                          />
                          <AvatarFallback className="text-3xl">
                            {selectedStudent.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold">
                          {selectedStudent.name}
                        </h3>
                        <Badge variant="outline" className="bg-primary/10">
                          {/* {selectedStudent.school.name} */}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        <div className="flex items-start gap-2">
                          <File className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Parent's Name</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedStudent.parentName
                                ? selectedStudent.parentName
                                : "Not provided"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Contact</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedStudent.contact
                                ? selectedStudent.contact
                                : "Not provided"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Parent's Contact</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedStudent.parentContact
                                ? selectedStudent.parentContact
                                : "Not provided"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Address</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedStudent.address
                                ? selectedStudent.address
                                : "Not provided"}
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
                                <span className="text-sm">
                                  {selectedStudent.presentDays.length} days
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="text-sm">
                                  {selectedStudent.absentDays.length} days
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="grades" className=" space-y-4 pt-4">
                    <GradeComponent student={selectedStudent} />
                  </TabsContent>

                  <TabsContent value="attendance" className=" space-y-4 pt-4">
                    <TeacherAttendence teacher={selectedStudent} />
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDataAnalytics;
