import React from "react";
import {
  FaAngleRight,
  FaAngleLeft,
  FaHome,
  FaInfoCircle,
  FaRocketchat,
  FaFileUpload,
  MdPowerOff
} from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import "../css/HoLeftNavBar.css";
import { Link } from 'react-router-dom';
import { useAuth } from "../../../context/auth.jsx";

const LeftSideNavbar = ({ isExpanded, toggleSidebar }) => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      _id: null,
      token: "",
      role:""
    });
    localStorage.removeItem("token");
    window.location.href = window.location.origin+"/login"
  };

  return (
    <div
    className={`${
      isExpanded ? "w-64" : "w-16"
    } h-screen transition-all duration-300 border-r-4 border-gray-50 fixed`}
  >
    <button
      onClick={toggleSidebar}
      className="p-4 focus:outline-none text-xl textColor bGcolor w-full"
    >
      {isExpanded ? <FaAngleLeft />  :<FaAngleRight />}
    </button>

    <ul className="mt-4"> 
      <li className="bGcolor ">
      <Link to="/student" className=" flex items-center p-4 rounded cursor-pointer">
        <FaHome className="text-xl textColor " />
        {isExpanded && <span className="ml-4 textColor font-normal">Home</span>}
      </Link> 
      </li> 

      <li className="bGcolor ">
      <Link to="/student/submit-homework" className=" flex items-center p-4 rounded cursor-pointer">
      <FaFileUpload className="text-xl textColor " />
        {isExpanded && <span className="ml-4 textColor font-normal">Sumbit Homework</span>}
      </Link>
      </li>
     
      <li className="bGcolor "> 
      <Link to="/student/performance" className=" flex items-center p-4 rounded cursor-pointer">
      <IoIosDocument className="text-xl textColor " />
        {isExpanded && <span className="ml-4 textColor font-normal"> Performance Report</span>}
      </Link> 
      </li>

      <li className="bGcolor ">
      <Link to="/student/attendance" className=" flex items-center p-4 rounded cursor-pointer">
      <FaInfoCircle className="text-xl textColor " />
        {isExpanded && <span className="ml-4 textColor font-normal">Attendence</span>}
      </Link>
      </li>
     
      <li className="bGcolor ">
      <Link to="/student/notifications" className=" flex items-center p-4 rounded cursor-pointer">
        <MdNotificationsActive className="text-xl textColor " />
        {isExpanded && <span className="ml-4 textColor font-normal">Notifications</span>}
      </Link> 
      </li>
      <li className="bGcolor ">
      <Link to="/student/doubts" className=" flex items-center p-4 rounded cursor-pointer">
      <FaRocketchat className="text-xl textColor " />
        {isExpanded && <span className="ml-4 textColor font-normal">Doubts(Chat bot)</span>}
      </Link>
      </li>
      <li className="bGcolor ">
      <Link to="/login" className=" flex items-center p-4 rounded cursor-pointer" onClick={handleLogout}>
      <MdPowerOff className="text-xl textColor " />
        {isExpanded && <span className="ml-4 textColor font-normal">LogOut</span>}
      </Link>
      </li>
    </ul>
  </div>
  );
};

export default LeftSideNavbar;
