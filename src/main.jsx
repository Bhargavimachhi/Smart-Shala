import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/auth.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <BrowserRouter>
      <App />
  </BrowserRouter>
    </AuthProvider>


  
)
