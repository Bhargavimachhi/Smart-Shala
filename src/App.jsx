import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherListingpage from './Pages/Admin/Pages/TeacherListing';
import StudentListingpage from './Pages/Admin/Pages/StudentListing';
import Dataanalyticspage from './Pages/Admin/Pages/Dataanalyticspage';
import Teacherloginportal from './Teacherloginportal';
import AdminLoginpage from './Pages/Admin/Pages/AdminLoginPage';

import StudentHomePage from './Pages/Student/StudentPages/StudentHomePage.jsx';
import AdminHome from './Pages/Admin/Pages/AdminHome';
import AddStudent from "./Pages/Student/StudentPages/StudentSignUpForm.jsx";
import AddTeacher from "./Pages/Teacher/Pages/TeacherSignUpForm.jsx";
import { Toaster } from "react-hot-toast";
import ClassroomListingpage from "./Pages/Admin/Pages/ClassroomListing.jsx";
import Classroom from "./Pages/Admin/Pages/Classroom.jsx";
import SubmitHomework from "./Pages/Student/StudentPages/SubmitHomework.jsx";
import StudentNotification from "./Pages/Student/StudentPages/StudentNotification.jsx";
import Issuessection from "./Pages/Admin/Pages/Issuessection.jsx";

import TeacherHomePage from './Pages/Teacher/Pages/TeacherHomePage';
import TeacherSignUpForm from './Pages/Teacher/Pages/TeacherSignUpForm';

import TeacherProfilePage from './Pages/Teacher/Pages/TeacherProfilePage'; // Import the new page
import AdminForm from "./Pages/Admin/Pages/AdminSignup.jsx";
import AddHomeworkPage from './Pages/Teacher/Pages/AddHomeworkPage';
import StudentChatbot from "./Pages/Student/StudentPages/StudentChatbot.jsx";

function App() {

  // Routers page
  return (
    <>
  
      <Routes>
        <Route path='/admin' element={<AdminHome/>}   /> 
        <Route path="/admin/students" element={<StudentListingpage />} />
        <Route path="/admin/teachers" element={<TeacherListingpage />} />
        <Route path="/admin/classrooms" element={<ClassroomListingpage/>} />
        <Route path="/admin/classrooms/:id" element={<Classroom/>} />
        <Route path="/admin/data-analytics" element={<Dataanalyticspage />} />
        <Route path="/admin/signup" element={<AdminForm />} />

        <Route path="/login" element={<Teacherloginportal />} />
        <Route path="/adminlogin" element={<AdminLoginpage/>} />
        <Route path='/signup/student' element={<AddStudent/>} />
        <Route path='/signup/teacher' element={<AddTeacher/>} />

        {/* student page route */} 
        <Route path='/student' element={<StudentHomePage/>}   /> 
        <Route path='/student/SubmitHomework' element={<SubmitHomework/>}/> 
        <Route path='/student/Notification' element={<StudentNotification/>}   /> 
        <Route path='/student/Doubts' element={<StudentChatbot/>}   /> 
  
        <Route path='/teacher' element={<TeacherHomePage />} />
        <Route path='/teacher/signup' element={<TeacherSignUpForm />} />

        <Route path='/teacher/profile' element={<TeacherProfilePage />} />
        <Route path='/teacher/add-homework' element={<AddHomeworkPage />} />
        <Route path='/admin/Issues' element={<Issuessection/>} />
      </Routes>
      <Toaster/>
   
    </>
  )
}

export default App
