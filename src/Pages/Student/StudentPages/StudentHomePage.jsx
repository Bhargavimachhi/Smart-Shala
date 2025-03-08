import React, { useState, useEffect } from "react";
import LeftSideNavbar from "../Components/LeftSideNavBar";
import UnitTestBoxContainer from "../Components/hompageComponent/UnitTestBoxContainer";
import OnlineMeetSchedule from "../Components/hompageComponent/OnlineMeetSchedule";
import "../css/rawcss.css";
import RightSidebar from "../Components/hompageComponent/RightSidebar";
import { useAuth } from "../../../context/auth";
import { useNavigate } from "react-router-dom";
import { ICONS } from "../Icons/icons";
const StudentHomePage = () => {
  const [studentAuth] = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!studentAuth?.token || studentAuth.role !== "student") {
      navigate("/student/login", { replace: true });
    }
  }, [studentAuth, navigate]);

  if (!studentAuth?.token || studentAuth.role !== "student") {
    return null;
  }

  const studentInfo = {
    name: "Cupie Johnson",
    standard: "12th Grade",
    rollNumber: "A12B34",
    contact: "9876543210",
    gender: "Male",
    birthdate: "28-02-2007",
  };

  return (
    <>
      <div className="flex flex-col min-h-screen md:flex-row">
        {/* Left Sidebar */}
        <LeftSideNavbar
          isExpanded={isExpanded}
          toggleSidebar={() => setIsExpanded(!isExpanded)}
        />

        {/* Main Content */}
        <div
          className={`flex-1 p-4 ${
            isExpanded ? "ml-56" : "ml-16"
          } transition-all duration-300`}
        >
          <div className="flex flex-col items-center justify-between p-2 shadow-sm md:flex-row">
            <div className="max-w-3xl text-center md:text-left">
              <h1 className="text-2xl font-bold leading-tight text-btn">
                Tomorrow will be a fantastic day for you, {studentInfo.name} 😁
              </h1>
              <p className="my-2 text-sm text-text">
                But only if you finish your homework today!
              </p>
            </div>
          </div>

          {/* Student Information */}
          <div className="p-4 mt-4 bg-white border rounded-lg shadow-md border-btn">
            <h2 className="mb-4 text-2xl font-semibold text-start text-text">
              Student Information
            </h2>
            <hr className="mb-4 border border-b-btn" />
            <div className="flex items-center justify-start mb-4">
              <ICONS.USER className="text-5xl text-blue-600 rounded-full cursor-pointer hover:bg-bgBlue hover:text-white" />
            </div>
            <div className="grid grid-cols-1 gap-4 text-start md:grid-cols-2 text-text">
             
              <p>
                <span className="font-bold">Name : </span> {studentInfo.name}
              </p>
              <p>
                <span className="font-bold">Standard : </span>{" "}
                {studentInfo.standard}
              </p>
              <p>
                <span className="font-bold">Roll Number : </span>{" "}
                {studentInfo.rollNumber}
              </p>
              <p>
                <span className="font-bold">Contact : </span>+91{" "}
                {studentInfo.contact}
              </p>
              <p>
                <span className="font-bold">Gender : </span>
                {studentInfo.gender}
              </p>
              <p>
                <span className="font-bold">Birthdate : </span>
                {studentInfo.birthdate}
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </>
  );
};

export default StudentHomePage;
