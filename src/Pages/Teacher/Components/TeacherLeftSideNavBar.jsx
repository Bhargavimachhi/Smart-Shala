import React from "react";
import { FaAngleRight, FaAngleLeft, FaHome, FaBook, FaChalkboardTeacher, FaUser, FaCamera } from "react-icons/fa";
import { MdAssignment, MdNotificationsActive } from "react-icons/md";
import { Link } from 'react-router-dom';
import '../css/HoLeftNavBar.css';

const TeacherLeftSideNavBar = ({ isExpanded, toggleSidebar }) => {
  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-16"
      } h-screen transition-all duration-300 border-r-4 border-gray-50 fixed`}
    >
      <button
        onClick={toggleSidebar}
        className="p-4 focus:outline-none text-xl textColor colorNavChange w-full"
      >
        {isExpanded ? <FaAngleLeft className="text-blue-600 colorNavChange"/>  && <span>Teacher Name</span>: <FaAngleRight className="text-blue-600 colorNavChange" />}
      </button>

      <ul className="mt-4">
        <Link to="/teacher" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaHome className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Home</span>}
        </Link>
        <Link to="/teacher/profile" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaUser className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Profile</span>}
        </Link>
        <Link to="/teacher/classrooms" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaChalkboardTeacher className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">My Classrooms</span>}
        </Link>
        <Link to="/teacher/add-homework" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <MdAssignment className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Add Homework</span>}
        </Link>
        <Link to="/teacher/notifications" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <MdNotificationsActive className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Notifications</span>}
        </Link>
        <Link to="/teacher/mark-attendance" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaCamera className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Mark Attendance</span>}
        </Link>
      </ul>
    </div>
  );
};

export default TeacherLeftSideNavBar;