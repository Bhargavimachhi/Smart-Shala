import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center p-5" style={{ backgroundImage: "url('/background.jpg')" }}>
      <header className="w-full bg-blue-600 bg-opacity-75 text-white p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Smart Shala</h1>
        <nav className="flex space-x-4">
          <NavLink to="/login" className="hover:text-gray-300">Login</NavLink>
          <NavLink to="/signup" className="hover:text-gray-300">Sign Up</NavLink>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center bg-white bg-opacity-75 p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Welcome to Smart Shala</h2>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Your one-stop solution for managing school activities, including student and teacher management, attendance, homework, and more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <NavLink to='/login/admin'>
            <div className="bg-blue-500 text-white shadow-xl px-10 py-5 rounded-md hover:bg-blue-600 cursor-pointer transition duration-300 flex flex-col items-center">
              <FaUserShield className="text-4xl mb-2" />
              <span>Admin</span>
            </div>
          </NavLink>
          <NavLink to='/login/teacher'>
            <div className="bg-blue-500 text-white shadow-xl px-10 py-5 rounded-md hover:bg-blue-600 cursor-pointer transition duration-300 flex flex-col items-center">
              <FaChalkboardTeacher className="text-4xl mb-2" />
              <span>Teacher</span>
            </div>
          </NavLink>
          <NavLink to='/login/student'>
            <div className="bg-blue-500 text-white shadow-xl px-10 py-5 rounded-md hover:bg-blue-600 cursor-pointer transition duration-300 flex flex-col items-center">
              <FaUserGraduate className="text-4xl mb-2" />
              <span>Student</span>
            </div>
          </NavLink>
        </div>
      </main>
      <footer className="w-full bg-blue-600 bg-opacity-75 text-white p-4 flex justify-center items-center">
        <p>&copy; 2023 Smart Shala. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;