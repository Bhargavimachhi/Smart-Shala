// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./index.css";
// import { Button,Card,CardContent } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherListingpage from './TeacherListing';
import Dataanalyticspage from './Dataanalyticspage';
import Teacherloginportal from './Teacherloginportal';
import AdminLoginpage from './AdminLoginpage';
import SignupFunction from './Signupsection';
import StudentsListingpage from './StudentsListing';
import AdminHome from './Pages/Admin/Pages/AdminHome';
import { Toaster } from 'react-hot-toast';
import AddStudent from "./Pages/Admin/Pages/AddStudent";



function App() {

  // Routers page



  return (
    <>




    <BrowserRouter>

    <Routes>

    <Route path='/admin' element={<AdminHome/>}   />
    <Route path="/Teachers" element={<TeacherListingpage />} />
    <Route path="/students" element={<StudentsListingpage />} />
    <Route path="/AddStudent" element={<AddStudent/>}/>

     <Route path="/data" element={<Dataanalyticspage />} />
    <Route path="/login" element={<Teacherloginportal />} />
    <Route path="/adminlogin" element={<AdminLoginpage/>} />
    <Route path='/Signup' element={<SignupFunction/>} />
    </Routes>
    
    </BrowserRouter>
    




    
  
    </>
  )
}

export default App
