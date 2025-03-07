import React from "react";
import "../css/HoLeftNavBar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth.jsx";
import { ICONS } from "../Icons/icons";

const LeftSideNavbar = ({ isExpanded, toggleSidebar }) => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      _id: null,
      token: "",
      role: "",
    });
    localStorage.removeItem("token");
  };

  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-16"
      } h-screen transition-all duration-300  fixed border border-r-btn`}
    >
      <button
        onClick={toggleSidebar}
        className="w-full p-4 text-xl focus:outline-none textColor bGcolor"
      >
        {isExpanded ? <ICONS.LEFT /> : <ICONS.RIGHT />}
      </button>

      <ul className="mt-4">
        <li className="bGcolor">
          <Link
            to="/student"
            className="flex items-center p-4 rounded cursor-pointer"
          >
            <ICONS.HOME className="text-xl textColor" />
            {isExpanded && (
              <span className="ml-4 font-normal textColor">Home</span>
            )}
          </Link>
        </li>

        <li className="bGcolor">
          <Link
            to="/student/submit-homework"
            className="flex items-center p-4 rounded cursor-pointer"
          >
            <ICONS.FILE className="text-xl textColor" />
            {isExpanded && (
              <span className="ml-4 font-normal textColor">
                Sumbit Homework
              </span>
            )}
          </Link>
        </li>

        <li className="bGcolor">
          <Link
            to="/student/performance"
            className="flex items-center p-4 rounded cursor-pointer"
          >
            <ICONS.DOCUMENT className="text-xl textColor" />
            {isExpanded && (
              <span className="ml-4 font-normal textColor">
                {""}
                Performance Report
              </span>
            )}
          </Link>
        </li>

        <li className="bGcolor ">
          <Link
            to="/student/attendance"
            className="flex items-center p-4 rounded cursor-pointer "
          >
            <ICONS.INFO className="text-xl textColor " />
            {isExpanded && (
              <span className="ml-4 font-normal textColor">Attendence</span>
            )}
          </Link>
        </li>

        <li className="bGcolor ">
          <Link
            to="/student/doubts"
            className="flex items-center p-4 rounded cursor-pointer "
          >
            <ICONS.CHAT className="text-xl textColor " />
            {isExpanded && (
              <span className="ml-4 font-normal textColor">
                Doubts(Chat bot)
              </span>
            )}
          </Link>
        </li>
        <li className="bGcolor ">
          <Link
            to="/login"
            className="flex items-center p-4 rounded cursor-pointer "
            onClick={handleLogout}
          >
            <ICONS.LOGOUT className="text-xl textColor " />
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
