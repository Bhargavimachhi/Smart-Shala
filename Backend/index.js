import express from 'express';
const app = express();
const PORT = 3000;
import { addStudent } from './Controller/student.js';
import { addTeacher } from './Controller/teacher.js';
import mongoose from 'mongoose';
import cors from "cors";


app.use(express.json());

app.use(cors());

app.post('/signupstudent', addStudent);
app.post('/signupteacher', addTeacher);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    mongoose.connect("mongodb+srv://zobime660:manush2005@cluster0.dxrqqdn.mongodb.net/SmartSha?retryWrites=true&w=majority").then(()=>{
        console.log("Connected to Database");
    });
});