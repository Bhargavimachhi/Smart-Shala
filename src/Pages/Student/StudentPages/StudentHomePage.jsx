import React, { useState, useEffect } from "react";
import LeftSideNavbar from "../Components/LeftSideNavBar";
import "../css/rawcss.css";
import { useNavigate } from "react-router-dom";
import { ICONS } from "../Icons/icons";
import { useUserContext } from "@/context/userContext";
import Loader from "@/Pages/InitialPages/Loader";
import { ResponsiveCalendar } from "@nivo/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StudentHomePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const navigate = useNavigate();
  const { userData } = useUserContext();
  const currYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currYear);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        let data = userData.presentDays;

        data = data.map((date) => ({ day: date, value: 1 }));
        setAttendanceData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    fetchAttendance();
  }, [navigate, userData]);

  const studentInfo = {
    name: userData?.name,
    email: userData?.email,
    standard: "12th Grade",
    rollNumber: "A12B34",
    contact: userData?.contact,
  };

  if (loading) {
    return <Loader text="Loading User..." />;
  }

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
                <span className="font-bold">Email : </span> {studentInfo.email}
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
            </div>
          </div>

          <div className="p-6 mt-6 bg-white shadow-lg rounded-2xl">
            <h3 className="mb-4 text-xl font-bold text-center">
              Attendance Overview
            </h3>
            <Select
              value={selectedYear}
              onValueChange={(e) => {
                setSelectedYear(e);
              }}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={currYear}>{currYear}</SelectItem>
                <SelectItem value={currYear - 1}>{currYear - 1}</SelectItem>
                <SelectItem value={currYear - 2}>{currYear - 2}</SelectItem>
                <SelectItem value={currYear - 3}>{currYear - 3}</SelectItem>
                <SelectItem value={currYear - 4}>{currYear - 4}</SelectItem>
              </SelectContent>
            </Select>
            <div className="h-60">
              <ResponsiveCalendar
                data={attendanceData}
                from={`${selectedYear}-01-01`}
                to={`${selectedYear}-12-31`}
                emptyColor="#eeeeee"
                colors={["#33cc33"]}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHomePage;
