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
import PendingHomeWork from "./Pages/Student/Components/submitHWComponent/PendingHomeWork.jsx";

import TeacherHomePage from './Pages/Teacher/Pages/TeacherHomePage';
import TeacherSignUpForm from './Pages/Teacher/Pages/TeacherSignUpForm';
import TeacherProfilePage from './Pages/Teacher/Pages/TeacherProfilePage'; 
import MarkTeacherAttendance from './Pages/Teacher/Pages/MarkTeacherAttendance'; 
import GenerateTeacherIssue from './Pages/Teacher/Pages/GenerateTeacherIssue'; 

import AdminForm from "./Pages/Admin/Pages/AdminSignup.jsx";
import AddHomeworkPage from './Pages/Teacher/Pages/AddHomeworkPage';
import StudentChatbot from "./Pages/Student/StudentPages/StudentChatbot.jsx";
import TeachersClassroom from "./Pages/Teacher/Pages/TeachersClassroom.jsx";

import StudentAttendancePage from "./Pages/Student/StudentPages/StudentAttendancePage.jsx";
import Initial from "./Pages/InitialPages/Initial.jsx";
import CommonLogin from "./Pages/InitialPages/CommonLogin.jsx";
import TeacherLogin from "./Pages/InitialPages/TeacherLogin.jsx";
import StudentLogin from "./Pages/InitialPages/StudentLogin.jsx";
import { useEffect } from "react";
import LoginAlert from "./components/LoginAlert.jsx";
import PageNotFound from "./components/PageNotFound.jsx"


function App() {
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  // Routers page
  return (
    <>
  
      <Routes>

        {
          /* Admin Page Routes */
          savedAuth && savedAuth.role == 'admin' ? 
            <>
              <Route path='/admin' element={<AdminHome/>}   /> 
              <Route path="/admin/students" element={<StudentListingpage />} />
              <Route path="/admin/teachers" element={<TeacherListingpage />} />
              <Route path="/admin/classrooms" element={<ClassroomListingpage/>} />
              <Route path="/admin/classrooms/:id" element={<Classroom/>} />
              <Route path="/admin/data-analytics" element={<Dataanalyticspage />} />
              <Route path='/admin/issues' element={<Issuessection/>} />
            </> :
            <>
              <Route path='/admin' element={<LoginAlert/>}   /> 
              <Route path="/admin/students" element={<LoginAlert />} />
              <Route path="/admin/teachers" element={<LoginAlert />} />
              <Route path="/admin/classrooms" element={<LoginAlert/>} />
              <Route path="/admin/classrooms/:id" element={<LoginAlert/>} />
              <Route path="/admin/data-analytics" element={<LoginAlert />} />
              <Route path='/admin/issues' element={<LoginAlert/>} />
            </>
        }
        
        {
          /* Student Page Routes */
          savedAuth && savedAuth.role == 'student' ?
          <>
            <Route path='/student' element={<StudentHomePage/>}   /> 
            <Route path='/student/submit-homework' element={<SubmitHomework/>}/> 
            <Route path='/student/notification' element={<StudentNotification/>}   /> 
            <Route path='/student/doubts' element={<StudentChatbot/>}   /> 
            <Route path='/student/pending-homework' element={<PendingHomeWork/>}   /> 
            <Route path='/student/attendance' element={<StudentAttendancePage/>}   /> 
          </> :
          <>
            <Route path='/student' element={<LoginAlert/>}   /> 
            <Route path='/student/submit-homework' element={<LoginAlert/>}/> 
            <Route path='/student/notification' element={<LoginAlert/>}   /> 
            <Route path='/student/doubts' element={<LoginAlert/>}   /> 
            <Route path='/student/pending-homework' element={<LoginAlert/>}   /> 
            <Route path='/student/attendance' element={<LoginAlert/>}   /> 
          </>
        }
  
        {
          /* Teacher Page Routes */
          savedAuth && savedAuth.role == 'teacher' ?
          <>
            <Route path='/teacher' element={<TeacherHomePage />} />
            <Route path='/teacher/signup' element={<TeacherSignUpForm />} />
            <Route path='/teacher/profile' element={<TeacherProfilePage />} />
            <Route path='/teacher/add-homework' element={<AddHomeworkPage />} />
            <Route path='/teacher/mark-attendance' element={<MarkTeacherAttendance />} /> 
            <Route path="/teacher/classrooms" element={<TeachersClassroom/>}/>
            <Route path='/teacher/generate-issue' element={<GenerateTeacherIssue />} />
          </> : 
          <>
            <Route path='/teacher' element={<LoginAlert />} />
            <Route path='/teacher/signup' element={<LoginAlert />} />
            <Route path='/teacher/profile' element={<LoginAlert />} />
            <Route path='/teacher/add-homework' element={<LoginAlert />} />
            <Route path='/teacher/mark-attendance' element={<LoginAlert />} /> 
            <Route path="/teacher/classrooms" element={<LoginAlert/>}/>
            <Route path='/teacher/generate-issue' element={<LoginAlert />} />
          </>
        }
        
        
        {/* SignUp Page Routes */}
        <Route path='/signup/student' element={<AddStudent/>} />
        <Route path='/signup/teacher' element={<AddTeacher/>} />
        <Route path="/signup/admin" element={<AdminForm />} />
    
        {/* Login Page Routes */}
        <Route path="/login" element={<CommonLogin/>} />
        <Route path="/login/admin" element={<AdminLoginpage/>} />
        <Route path="/login/teacher" element={<TeacherLogin/>} />
        <Route path="/login/student" element={<StudentLogin/>}/>

        <Route path="*" element={<PageNotFound />}/>
        
      </Routes>
      <Toaster/>
   
    </>
  )
}

export default App
