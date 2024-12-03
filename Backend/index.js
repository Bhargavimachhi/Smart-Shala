import express from "express";
import { Student } from "./Models/Student.js";
const app = express();
const PORT = 3000;
import {
  addStudent,
  getStudent,
  getAllStuents,
  deleteStudent,
  markPresent,
  markAbsent,
} from "./Controller/student.js";
import {
  addTeacher,
  getTeacher,
  getAllTeachers,
  deleteTeacher,
  getClassroomsOfTeacher,
} from "./Controller/teacher.js";
import mongoose from "mongoose";
import cors from "cors";
import {
  getAllClassrooms,
  getClassroom,
  deleteClassroom,
  editClassroom,
  assignHomeworkToClassroom,
  initiateAttendance,
  assignStudentToClassroom,
  assignTeacherToClassroom,
} from "./Controller/classroom.js";
import {
  addAdmin,
  addClassroomToAdmin,
  getClassroomsOfAdmin,
  getTeachersOfAdmin,
  getStudentsOfAdmin,
  addTeacherToAdmin,
  addStudentToAdmin,
  deleteStudentOfAdmin,
  deleteTeacherOfAdmin,
  deleteClassroomOfAdmin,
} from "./Controller/admin.js";
import {
  generateIssue,
  deleteIssue,
  markIssueAsResolved,
  getIssue,
  markIssueAsNotResolved,
} from "./Controller/issue.js";
import { getAnswer } from "./Controller/Chatbot.js";

// import  {requireSignIn}  from './middleware/requireSignIn.js';
import { adminLogin } from "./Controller/admin.js";
import LoginTeacher from "./Controller/loginTeacher.js";
import loginStudent from "./Controller/loginStudent.js";
import getIndividualStudent from "./Controller/getIndividualStudent.js";
import getIndividualAttendance from "./Controller/getIndividualAttendance.js";

app.use(express.json());

app.use(cors());

app.post("/signupstudent", addStudent);
app.post("/signupteacher", addTeacher);
app.post("/getclassroom", getClassroom);
app.post("/getallclassrooms", getAllClassrooms);
app.get("/getstudent/:id", getStudent);
app.get("/getteacher/:id", getTeacher);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  mongoose
    .connect(
      "mongodb+srv://zobime660:manush2005@cluster0.dxrqqdn.mongodb.net/SmartSha?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to Database");
    });
});

// classroom routes
app.get("/classroom/:id/delete", deleteClassroom);
app.post("/classroom/:id/edit", editClassroom);
app.post("/classroom/:id/initiate-attendance", initiateAttendance);
app.get("/classroom/:id", getClassroom);
app.post("/classroom/:id/assign-student", assignStudentToClassroom);
app.post("/classroom/:id/assign-teacher", assignTeacherToClassroom);

// teacher routes
app.post("/teacher/classrooms/:id/generate-issue", generateIssue);
app.get("/teacher/:id/classrooms", getClassroomsOfTeacher);
app.get("/teacher/:id", getTeacher);
app.post("/teacher/:id/assign-homework", assignHomeworkToClassroom);
app.get("/teacher/:id/delete", deleteTeacher);

// student routes
app.get("/student/:id/delete", deleteStudent);
app.get("/student/:id/attendance/present", markPresent);
app.get("/student/:id/attendance/absent", markAbsent);

// issue generation routes
app.get("/issue/:id/delete", deleteIssue);
app.get("/issue/:id", getIssue);
app.get("/issue/:id/resolve", markIssueAsResolved);
app.get("/issue/:id/refuse", markIssueAsNotResolved);

// admin routes
app.get("/admin/:id/classrooms", getClassroomsOfAdmin);
app.get("/admin/:id/students", getStudentsOfAdmin);
app.get("/admin/:id/teachers", getTeachersOfAdmin);
app.get("/admin/:aId/student/remove/:sId", deleteStudentOfAdmin);
app.get("/admin/:aId/teacher/remove/:tId", deleteTeacherOfAdmin);
app.get("/admin/:aId/classroom/remove/:cId", deleteClassroomOfAdmin);
app.post("/admin/:id/assign-classroom", addClassroomToAdmin);
app.post("/admin/:id/assign-teacher", addTeacherToAdmin);
app.post("/admin/:id/assign-student", addStudentToAdmin);
app.post("/addAdmin", addAdmin);

// chat bot routes
app.post("/getAnswer", getAnswer);

//login routes
app.post("/login/teacher", LoginTeacher);
app.post("/login/student", loginStudent);
app.post("/login/admin", adminLogin);
app.get("/students/:id", getIndividualStudent);




//getting Individual student Data
app.get("/admin/students", getAllStuents);

app.get("/admin/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//indivdual attendance route for calendar

app.get('/admin/students/:id', (req, res) => {
  const { id } = req.params;
  const student = Student.find((s) => s.id === id);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});