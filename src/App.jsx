import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherListingpage from './Pages/Admin/Pages/TeacherListing';
import Dataanalyticspage from './Pages/Admin/Pages/Dataanalyticspage';
import Teacherloginportal from './Teacherloginportal';
import AdminLoginpage from './Pages/Admin/Pages/AdminLoginPage';
import SignupFunction from './Signupsection';
import StudentsListingpage from './Pages/Admin/Pages/StudentsListing'; 
import StudentHomePage from './Pages/Students/StudentPages/StudentHomePage';
import AdminHome from './Pages/Admin/Pages/AdminHome';
import { Toaster } from 'react-hot-toast';
import AddStudent from "./Pages/Student/Pages/StudentSignUpForm.jsx";
import AddTeacher from "./Pages/Teacher/Pages/TeacherSignUpForm.jsx";


function App() {

  // Routers page
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<AdminHome/>}   /> 
        <Route path='/student' element={<StudentHomePage/>}   />
        <Route path="/admin/teachers" element={<TeacherListingpage />} />
        <Route path="/admin/students" element={<StudentsListingpage />} />
        <Route path="/admin/data-analytics" element={<Dataanalyticspage />} />
        <Route path="/login" element={<Teacherloginportal />} />
        <Route path="/adminlogin" element={<AdminLoginpage/>} />
        <Route path='/signup/student' element={<AddStudent/>} />
        <Route path='/signup/teacher' element={<AddTeacher/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
