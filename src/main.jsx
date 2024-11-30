import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/auth.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { TeacherProvider } from './context/teacherAuth.jsx'
// import { StudentProvider } from './context/studentAuth.jsx'


createRoot(document.getElementById('root')).render(
  // <TeacherProvider>
  // <StudentProvider>
  <AuthProvider>
  <BrowserRouter>
      <App />
  </BrowserRouter>
    </AuthProvider>
    // </StudentProvider>
    // </TeacherProvider>


  
)
