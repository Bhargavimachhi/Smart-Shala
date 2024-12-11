import React from "react";
import { FaAngleRight, FaAngleLeft, FaHome, FaBook, FaChalkboardTeacher, FaUser, FaCamera, FaRocketchat, FaFire } from "react-icons/fa";
import { MdAssignment, MdNotificationsActive } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom';
import '../css/HoLeftNavBar.css';
import { useAuth } from "../../../context/auth.jsx";


const TeacherLeftSideNavBar = ({ isExpanded, toggleSidebar }) => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      _id: null,
      token: "",
      role: ""
    });
    localStorage.removeItem("token");
  };

  return (
    <div
      className={`${isExpanded ? "w-64" : "w-16"
        } h-screen transition-all duration-300 border-r-4 border-gray-50 fixed`}
    >
      <button
        onClick={toggleSidebar}
        className="p-4 focus:outline-none text-xl textColor colorNavChange w-full"
      >
        {isExpanded ? <FaAngleLeft className="text-blue-600 colorNavChange" /> : <FaAngleRight className="text-blue-600 colorNavChange" />}
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
        <Link to="/teacher/classroomsforHomework" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaCamera className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Check Homework</span>}
        </Link>
        <Link to="/teacher/notifications" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <MdNotificationsActive className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Notifications</span>}
        </Link>
        <Link to="/teacher/mark-attendance" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaCamera className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Mark Attendance</span>}
        </Link>
        <Link to="/teacher/classrooms-low-attendance" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaCamera className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Check Attendance</span>}
        </Link>
        <Link to="/teacher/generate-issue" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaBook className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Generate Issue</span>}
        </Link>
        <Link to="/teacher/emergency" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaFire className="text-xl textColor text-red-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Emergency Alert</span>}
        </Link>
        <Link to="/login" className="colorNavChange flex items-center p-4 rounded cursor-pointer" onClick={handleLogout}>
          <IoLogOut className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">LogOut</span>}
        </Link>
      </ul>
    </div>
  );
};

export default TeacherLeftSideNavBar