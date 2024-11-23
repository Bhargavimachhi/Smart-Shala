import express from 'express';
const app = express();
const PORT = 3000;
import { addStudent, getStudent, getAllStuents, deleteStudent } from './Controller/student.js';
import { addTeacher, getTeacher, getAllTeachers, deleteTeacher, getClassroomsOfTeacher } from './Controller/teacher.js';
import mongoose from 'mongoose';
import cors from "cors";
import { getAllClassrooms, getClassroom, deleteClassroom } from './Controller/classroom.js';
import { addAdmin, addClassroomToAdmin, getClassroomsOfAdmin , getTeachersOfAdmin, getStudentsOfAdmin, addTeacherToAdmin, addStudentToAdmin} from './Controller/admin.js';
import { generateIssue, deleteIssue, markIssueAsResolved, getIssue, markIssueAsNotResolved } from './Controller/issue.js';


app.use(express.json());

app.use(cors());

app.post('/signupstudent', addStudent);
app.post('/signupteacher', addTeacher);
app.post("/getclassroom",getClassroom);
app.post("/getallclassrooms",getAllClassrooms);
app.get("/getstudent/:id", getStudent);
app.get("/getteacher/:id", getTeacher);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    mongoose.connect("mongodb+srv://zobime660:manush2005@cluster0.dxrqqdn.mongodb.net/SmartSha?retryWrites=true&w=majority").then(()=>{
        console.log("Connected to Database");
    });
});

app.get("/getclassroom/:id", getClassroom);
app.get("/getstudent/:id", getStudent);
app.get("/getteacher/:id", getTeacher);

app.get("/getclassrooms", getAllClassrooms);
app.get("/getstudents", getAllStuents);
app.get("/getteachers", getAllTeachers);

app.post("/addAdmin", addAdmin);

app.post("/teacher/classrooms/:id/generate-issue", generateIssue);
app.get("/teacher/:id/classrooms", getClassroomsOfTeacher);

app.get("/student/:id/delete", deleteStudent);
app.get("/teacher/:id/delete", deleteTeacher);
app.get("/classroom/:id/delete", deleteClassroom);
app.get("/issue/:id/delete", deleteIssue);
app.get("/issue/:id", getIssue);
app.get("/issue/:id/resolve", markIssueAsResolved);
app.get("/issue/:id/refuse", markIssueAsNotResolved);

app.get("/admin/:id/classrooms", getClassroomsOfAdmin);
app.get("/admin/:id/students", getStudentsOfAdmin);
app.get("/admin/:id/teachers", getTeachersOfAdmin);

app.post("/admin/:id/assign-classroom", addClassroomToAdmin);
app.post("/admin/:id/assign-teacher", addTeacherToAdmin);
app.post("/admin/:id/assign-student", addStudentToAdmin);