import React from 'react';
import { NavLink } from 'react-router-dom';

const CommonLogin = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-lg p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Login As</h1>
        <div className="flex space-x-5">
          <NavLink to='/login/admin'>
            <div className="bg-blue-500 text-white shadow-xl px-20 py-5 rounded-md hover:bg-blue-600 cursor-pointer transition duration-300">
              Admin
            </div>
          </NavLink>
          <NavLink to='/login/teacher'>
            <div className="bg-blue-500 text-white shadow-xl px-20 py-5 rounded-md hover:bg-blue-600 cursor-pointer transition duration-300">
              Teacher
            </div>
          </NavLink>
          <NavLink to='/login/student'>
            <div className="bg-blue-500 text-white shadow-xl px-20 py-5 rounded-md hover:bg-blue-600 cursor-pointer transition duration-300">
              Student
            </div>
          </NavLink>
        </div>
        <h2 className="text-xl text-gray-700 mt-8 text-center">
          This page will navigate to the login page and then verify your role to automatically access the appropriate page for teachers, students, and admins.
        </h2>
      </div>
    </div>
  );
};

export default CommonLogin;