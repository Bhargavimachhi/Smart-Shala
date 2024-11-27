import React from "react";
import {
  FaAngleRight,
  FaAngleLeft,
  FaHome,
  FaInfoCircle,
  FaRocketchat,
  FaFileUpload,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import "../css/HoLeftNavBar.css";
import { Link } from 'react-router-dom';

const LeftSideNavbar = ({ isExpanded, toggleSidebar }) => {
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
      <Link to="/student" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
        <FaHome className="text-xl textColor text-blue-600 colorNavChange" />
        {isExpanded && <span className="ml-4 textColor">Home</span>}
      </Link>
      <Link to="/student/submit-homework" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
      <FaFileUpload className="text-xl textColor text-blue-600 colorNavChange" />
        {isExpanded && <span className="ml-4 textColor">Sumbit Homework</span>}
      </Link>
      <Link to="/student/performance" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
      <IoIosDocument className="text-xl textColor text-blue-600 colorNavChange" />
        {isExpanded && <span className="ml-4 textColor"> Performance Report</span>}
      </Link>
      <Link to="/student/attendance" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
      <FaInfoCircle className="text-xl textColor text-blue-600 colorNavChange" />
        {isExpanded && <span className="ml-4 textColor">Attendence</span>}
      </Link>
      <Link to="/student/notifications" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
        <MdNotificationsActive className="text-xl textColor text-blue-600 colorNavChange" />
        {isExpanded && <span className="ml-4 textColor">Notifications</span>}
      </Link>
      <Link to="/student/doubts" className="colorNavChange flex items-center p-4 rounded cursor-pointer">
      <FaRocketchat className="text-xl textColor text-blue-600 colorNavChange" />
        {isExpanded && <span className="ml-4 textColor">Doubts(Chat bot)</span>}
      </Link>
    </ul>
  </div>
  );
};

export default LeftSideNavbar;
