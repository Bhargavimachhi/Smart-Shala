import React from "react";
import { FaAngleRight, FaAngleLeft, FaHome, FaInfoCircle, FaRocketchat } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md"; 
import '../css/HoLeftNavBar.css'

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
        {isExpanded ? <FaAngleLeft className="text-blue-600 colorNavChange"/>  && <span>Student Name</span>: <FaAngleRight className="text-blue-600 colorNavChange" />}
      </button>

      <ul className="mt-4">
        <div className="colorNavChange flex items-center p-4  rounded cursor-pointer">
          <FaHome className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Home</span>}
        </div>
        <div className="colorNavChange flex items-center p-4  rounded cursor-pointer">
          <FaInfoCircle className="text-xl textColor  text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Submit Homework</span>}
        </div>
        <div className="colorNavChange flex items-center p-4  rounded cursor-pointer">
          <MdNotificationsActive className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Notifications</span>}
        </div>
        <div className="colorNavChange flex items-center p-4  rounded cursor-pointer">
          <FaRocketchat className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && <span className="ml-4 textColor">Doubts (Chat Bot)</span>}
        </div>
      </ul>
    </div>
  );
};

export default LeftSideNavbar;
