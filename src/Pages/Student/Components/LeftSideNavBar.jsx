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
import { NavLink } from "react-router-dom";

const LeftSideNavbar = ({ isExpanded, toggleSidebar }) => {
  return (
    <div
      className={`${
        isExpanded ? "w-60" : "w-16"
      } h-screen  transition-width duration-300 border-r-4 border-gray-50 fixed flex flex-col justify-between`}
    >
      {/* Toggle Button */}
      <div>
        <button
          onClick={toggleSidebar}
          className="p-4 focus:outline-none text-xl textColor colorNavChange w-full flex items-center justify-start"
        >
          {isExpanded ? (
            <>
              <FaAngleLeft className="text-blue-600 colorNavChange" />
              <span className="ml-2">{isExpanded && "Student Name"}</span>
            </>
          ) : (
            <FaAngleRight className="text-blue-600 colorNavChange" />
          )}
        </button>

        {/* Top Menu Icons */}
        <ul className="mt-4">
          <div className="colorNavChange flex items-center p-4 rounded cursor-pointer">
            <FaHome className="text-xl textColor text-blue-600 colorNavChange" />
            {isExpanded && (
              <NavLink className="ml-4 textColor" to="/student">
                Home
              </NavLink>
            )}
          </div>
          <div className="colorNavChange flex items-center p-4 rounded cursor-pointer">
            <FaFileUpload className="text-xl textColor text-blue-600 colorNavChange" />
            {isExpanded && (
              <NavLink className="ml-4 textColor" to="/student/SubmitHomework">
                Submit Homework
              </NavLink>
            )}
          </div>
          <div className="colorNavChange flex items-center p-4 rounded cursor-pointer">
            <FaInfoCircle className="text-xl textColor text-blue-600 colorNavChange" />
            {isExpanded && (
              <NavLink className="ml-4 textColor" to="/student/Attendance">
                Attendance
              </NavLink>
            )}
          </div>
          <div className="colorNavChange flex items-center p-4 rounded cursor-pointer">
            <IoIosDocument className="text-xl textColor text-blue-600 colorNavChange" />
            {isExpanded && (
              <NavLink className="ml-4 textColor" to="/student/Performance">
                Performance Report
              </NavLink>
            )}
          </div>
          <div className="colorNavChange flex items-center p-4 rounded cursor-pointer">
            <MdNotificationsActive className="text-xl textColor text-blue-600 colorNavChange" />
            {isExpanded && (
              <NavLink className="ml-4 textColor" to="/student/Notifications">
                Notifications
              </NavLink>
            )}
          </div>
          <div className="colorNavChange flex items-center p-4 rounded cursor-pointer">
            <FaRocketchat className="text-xl textColor text-blue-600 colorNavChange" />
            {isExpanded && (
              <NavLink className="ml-4 textColor" to="/student/Doubts">
                Doubts (Chat Bot)
              </NavLink>
            )}
          </div>
        </ul>
      </div>

      {/* Bottom Menu Icons */}
      <div className="mb-4">
        <div className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaCog className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && (
            <NavLink className="ml-4 textColor" to="/student/Settings">
              Settings
            </NavLink>
          )}
        </div>
        <div className="colorNavChange flex items-center p-4 rounded cursor-pointer">
          <FaSignOutAlt className="text-xl textColor text-blue-600 colorNavChange" />
          {isExpanded && (
            <NavLink className="ml-4 textColor" to="/logout">
              Logout
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideNavbar;
