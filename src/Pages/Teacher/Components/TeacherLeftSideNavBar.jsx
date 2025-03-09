import React from "react";
import {
  FaAngleRight,
  FaAngleLeft,
  FaHome,
  FaUser,
  FaChalkboardTeacher,
  FaClipboardList,
  FaCheckCircle,
  FaBell,
  FaExclamationTriangle,
  FaBookOpen,
  FaBoxOpen,
} from "react-icons/fa";
import { MdAssignment, MdNotificationsActive } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../css/HoLeftNavBar.css";
import { useAuth } from "../../../context/auth.jsx";
import { ICONS } from "../../Admin/Icons/icons.jsx";
import { useUserContext } from "../../../context/userContext.jsx";

const TeacherLeftSideNavBar = ({ isExpanded, toggleSidebar }) => {
  const [auth, setAuth] = useAuth();
  const { userData } = useUserContext();
  const handleLogout = () => {
    setAuth({
      _id: null,
      token: "",
      role: "",
    });
    localStorage.removeItem("token");
  };

  const navItems = [
    {
      name: "Home",
      icon: <ICONS.HOME size={20} />,
      path: "/teacher",
    },
    {
      name: "My Classrooms",
      icon: <ICONS.CLASSROOMS size={20} />,
      path: "/teacher/classrooms",
    },
    {
      name: "Check Homework",
      icon: <FaClipboardList size={20} />,
      path: "/teacher/classroomsforHomework",
    },
    {
      name: "Mark Attendance",
      icon: <FaCheckCircle size={20} />,
      path: "/teacher/mark-attendance",
    },
    {
      name: "Check Attendance",
      icon: <FaChalkboardTeacher size={20} />,
      path: "/teacher/classrooms-low-attendance",
    },
    {
      name: "Generate Issue",
      icon: <FaExclamationTriangle size={20} />,
      path: "/teacher/generate-issue",
    },
    {
      name: "Request Resource",
      icon: <FaBoxOpen size={20} />,
      path: "/teacher/request-resource",
    },
  ];

  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-16"
      } h-screen transition-all duration-300 border-r-4 border-gray-50 fixed`}
    >
      <button
        onClick={toggleSidebar}
        className="p-4 focus:outline-none text-xl textColor w-full"
      >
        {isExpanded ? <FaAngleLeft /> : <FaAngleRight />}
      </button>

      {isExpanded && (
        <div className="flex items-center gap-2 p-2 ">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-btn">
            <span className="text-sm text-white">{userData?.name[0]}</span>
          </div>
          <div>
            <p className="text-sm font-medium">Hello {userData?.name}</p>
            <p className="text-xs text-text">{userData?.email}</p>
          </div>
        </div>
      )}

      <ul className="mt-4">
        {navItems.map((item, index) => {
          return (
            <li
              className={`${
                location.pathname === item.path
                  ? "bg-btn text-white sm:rounded-lg"
                  : "text-text hover:bg-btn hover:text-white sm:rounded-lg"
              } m-2 `}
            >
              <Link
                to={item.path}
                className={`${
                  isExpanded ? "justify-start" : "justify-center"
                } flex items-center px-2 py-4 rounded cursor-pointer`}
              >
                {item.icon}
                {isExpanded && (
                  <span className="ml-4 textColor font-normal">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
        <li className="rounded-lg text-text hover:bg-btn hover:text-white m-2">
          <Link
            to="/login"
            className={`${
              isExpanded ? "justify-start" : "justify-center"
            } flex items-center px-2 py-4 rounded cursor-pointer `}
            onClick={handleLogout}
          >
            <ICONS.LOGOUT size={20} />
            {isExpanded && (
              <span className="ml-4 font-normal textColor">LogOut</span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TeacherLeftSideNavBar;
