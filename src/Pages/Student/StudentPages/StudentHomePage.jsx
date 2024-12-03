import React, { useState, useEffect } from "react";
import LeftSideNavbar from "../Components/LeftSideNavBar";
import UnitTestBoxContainer from "../Components/hompageComponent/UnitTestBoxContainer";
import OnlineMeetSchedule from "../Components/hompageComponent/OnlineMeetSchedule";
import "../css/rawcss.css";
import RightSidebar from "../Components/hompageComponent/RightSidebar";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../../context/auth";
import { useNavigate } from "react-router-dom";

const StudentHomePage = () => {
  const [studentAuth] = useAuth(); // Assuming it's a context hook
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!studentAuth?.token || studentAuth.role !== "student") {
      navigate("/student/login", { replace: true }); // Replace history to avoid back navigation
    }
  }, [studentAuth, navigate]);

  // Render nothing if redirecting
  if (!studentAuth?.token || studentAuth.role !== "student") {
    return null;
  }
{console.log("data student Context", studentAuth);
}
  return (
    <div className="flex flex-wrap">
      {/* Left Sidebar */}
      <LeftSideNavbar isExpanded={isExpanded} toggleSidebar={handleToggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-width duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center p-2 shadow-sm">
          {/* Title */}
          <div className="max-w-3xl">
            <h1 className="text-2xl font-bold bGcolor leading-tight cursor-pointer">
              Tomorrow will be a fantastic day for you, Cupie 😁
            </h1>
            <p className="text-gray-600 text-sm">
              But only if you finish your homework today!
            </p>
          </div>

          {/* Profile Icon */}
          <div className="flex items-center space-x-3">
            <FaUserCircle className="text-3xl text-blue-600 cursor-pointer bGcolor transition duration-200" />
          </div>
        </div>

        {/* Main Content */}
        <div className="justify-between gap-6">
          <UnitTestBoxContainer />
          <OnlineMeetSchedule />
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default StudentHomePage;
