import React from "react";
import "../css/HoLeftNavBar.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/auth.jsx";
import { ICONS } from "../Icons/icons";

const LeftSideNavbar = ({ isExpanded, toggleSidebar }) => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const handleLogout = () => {
    setAuth({
      _id: null,
      token: "",
      role: "",
    });
    localStorage.removeItem("token");
  };

  const StudentNavLinks = [
    { name: "Home", icon: <ICONS.HOME size={20} />, path: "/student" },
    {
      name: "Submit Homework",
      icon: <ICONS.FILE size={20} />,
      path: "/student/submit-homework",
    },
    {
      name: "Performance Report",
      icon: <ICONS.DOCUMENT size={20} />,
      path: "/student/performance",
    },
    {
      name: "Quizzes",
      icon: <ICONS.QUIZ size={20} />,
      path: "/student/quizzes",
    },
    {
      name: "Attendence",
      icon: <ICONS.INFO size={20} />,
      path: "/student/attendance",
    },
    {
      name: " Doubts(Chat bot)",
      icon: <ICONS.CHAT size={20} />,
      path: "/student/doubts",
    },
  ];

  return (
    <div
      className={`${
        isExpanded ? "w-56" : "w-16"
      } h-screen transition-all duration-300  fixed border border-r-btn`}
    >
      <button
        onClick={toggleSidebar}
        className="w-full px-2 py-4 text-xl focus:outline-none text-text bg-bg"
      >
        {isExpanded ? <ICONS.LEFT /> : <ICONS.RIGHT />}
      </button>

      <ul className={`${isExpanded ? "p-2" : "p-1"} mt-4`}>
        {StudentNavLinks.map((item, index) => {
          return (
            <li
              key={index}
              className={`mb-2 sm:rounded-lg text-text hover:bg-btn hover:text-white ${
                location.pathname === item.path ? "bg-btn text-white" : ""
              }`}
            >
              <Link
                to={item.path}
                className={`${
                  isExpanded ? "justify-start" : "justify-center"
                } flex items-center px-2 py-4 rounded cursor-pointer`}
              >
                {item.icon}
                {isExpanded && (
                  <span className="ml-4 font-normal textColor">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          );
        })}

        <li className="rounded-lg text-text hover:bg-btn hover:text-white">
          <Link
            to="/login"
            className={`${
              isExpanded ? "justify-start" : "justify-center"
            } flex items-center px-2 py-4 rounded cursor-pointer`}
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

export default LeftSideNavbar;
