import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./index.css";
import { Button,Card,CardContent } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Teacherpage from './Teacherpage';
import Studentspage from './Studentspage';
import Dataanalyticspage from './Dataanalyticspage';






function App() {

  // Routers page



  return (
    <>

    <BrowserRouter>

    <Routes>

    <Route path="/Teachers" element={<Teacherpage />} />
    <Route path="/students" element={<Studentspage />} />
    <Route path="/data" element={<Dataanalyticspage />} />
    </Routes>
    
    </BrowserRouter>




    
  
    </>
  )
}

export default App
