import React from "react";
import { FaAngleRight, FaAngleLeft, FaHome, FaBook, FaChalkboardTeacher, FaUser, FaCamera, FaRocketchat, FaFire } from "react-icons/fa";
import { MdAssignment, MdNotificationsActive } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom';
import '../css/HoLeftNavBar.css';
import { useAuth } from "../../../context/auth.jsx";
import { GoTools } from "react-icons/go";
import { FaRunning } from "react-icons/fa";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { MdPlaylistAddCheck } from "react-icons/md";
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
        className="p-4 focus:outline-none text-xl textColor w-full"
      >
        {isExpanded ? <FaAngleLeft className="                  " /> : <FaAngleRight className="                  e" />}
      </button>

      <ul className="mt-4">
         <li className="bGcolor "> 
         <Link to="/teacher" className="flex items-center p-4 rounded cursor-pointerr">
             <FaHome className="text-xl textColor " />
             {isExpanded && <span className="ml-4 textColor font-normal">Home</span> }
          </Link>
          </li>
       
         <li className="bGcolor ">
         <Link to="/teacher/profile" className=" e flex items-center p-4 rounded cursor-pointer">
          <FaUser className="text-xl textColor                  " />
          {isExpanded && <span className="ml-4 textColor font-normal">Profile</span>}
        </Link>
          </li>
         <li className="bGcolor ">
         <Link to="/teacher/classrooms" className="  flex items-center p-4 rounded cursor-pointer">
          <FaChalkboardTeacher className="text-xl textColor               " />
          {isExpanded && <span className="ml-4 textColor font-normal">My Classrooms</span>}
        </Link>
          </li>
         <li className="bGcolor ">
         <Link to="/teacher/add-homework" className="  flex items-center p-4 rounded cursor-pointer">
          <MdAssignment className="text-xl                 hover:                " />
          {isExpanded && <span className="ml-4 textColor font-normal">Add Homework</span>}
        </Link>
          </li>
        <li className="bGcolor ">
        <Link to="/teacher/classroomsforHomework" className="    flex items-center p-4 rounded cursor-pointer">
          <MdPlaylistAddCheck  className="text-xl textColor                 " />
          {isExpanded && <span className="ml-4 textColor font-normal">Check Homework</span>}
        </Link>
        </li> 
       
       <li className="bGcolor ">
         <Link to="/teacher/mark-attendance" className="   flex items-center p-4 rounded cursor-pointer">
          <BsFileEarmarkCheckFill className="text-xl textColor                   " />
          {isExpanded && <span className="ml-4 textColor">Mark Attendance</span>}
         </Link>
        </li> 
        <li className="bGcolor ">
         <Link to="/teacher/classrooms-low-attendance" className="   flex items-center p-4 rounded cursor-pointer">
          <FaCamera className="text-xl textColor                 " />
          {isExpanded && <span className="ml-4 textColor font-normal">Check Attendance</span>}
         </Link>
        </li>
         <li className="bGcolor ">
         <Link to="/teacher/generate-issue" className="   flex items-center p-4 rounded cursor-pointer">
          <FaBook className="text-xl textColor                   " />
          {isExpanded && <span className="ml-4 textColor font-normal">Generate Issue</span>}
        </Link>
          </li>
         <li className="bGcolor ">
          <Link to="/teacher/emergency" className="   flex items-center p-4 rounded cursor-pointer">
          <FaFire className="text-xl textColor text-sky-800   " />
          {isExpanded && <span className="ml-4 textColor font-normal">Emergency Alert</span>}
        </Link>
          </li>
        <li className="bGcolor ">
        <Link to="/teacher/request-resource" className="   flex items-center p-4 rounded cursor-pointer">
          <GoTools className="text-xl textColor                   " />
          {isExpanded && <span className="ml-4 textColor font-normal">Request Resource</span>}
          </Link>
          </li>
        <li className="bGcolor ">
         <Link to="/login" className="   flex items-center p-4 rounded cursor-pointer" onClick={handleLogout}>
          <IoLogOut className="text-xl textColor                   " />
          {isExpanded && <span className="ml-4 textColor">LogOut</span>}
         </Link>
        </li> 
      </ul>
    </div>
  );
};

export default TeacherLeftSideNavBar