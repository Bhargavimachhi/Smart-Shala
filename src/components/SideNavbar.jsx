import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SideNavbar = () => {
  const location = useLocation()   
  const navigate = useNavigate()   

  const navItems = [
    { name: 'Teachers', path: '/Teachers' },
    { name: 'Student', path: '/students' },
    { name: 'Classes', path: '/data' },
   
  ]

  return (
    <div className="w-64 bg-white shadow-lg p-4 space-y-4">
      <div className="flex items-center gap-2 p-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white text-sm">A</span>
        </div>
        <div>
          <p className="text-sm font-medium">Admin name</p>
          <p className="text-xs text-gray-500">admin@example.com</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-2 p-2 rounded-lg ${
              location.pathname === item.path ? 'text-white bg-blue-500' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            {item.name}
          </button>
        ))}
      </nav>

      <button
        onClick={() => navigate('/logout')}
        className="w-full flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg mt-auto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  )
}

export default SideNavbar
