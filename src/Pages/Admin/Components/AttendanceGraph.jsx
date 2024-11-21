// import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Flat, Heat, Nested } from "@alptugidin/react-circular-progress-bar";

const AttendanceGraph = () => {
  const studentAttendance = 84; // Percentage for students
  const teacherAttendance = 91; // Percentage for teachers
  const AttendanceData =[
    { text: "Students", value: 84, color: "#fde047" },
    { text: "Teachers", value: 50, color: "#0ea5e9" },
  ];

  return (
    <div className="w-64 h-80 p-4 ml-10 mt-5 bg-white rounded-lg shadow-lg flex flex-col items-center border border-blue-300">
      {/* Title */}
      <div className="flex justify-between w-full items-center">
        <h3 className="text-lg font-semibold text-gray-700">Attendance</h3>
        <span className="text-gray-400">•••</span> {/* Dots for menu */}
      </div>

      {/* Radial Progress Bar */}
      <div className="relative my-4 w-16 h-16">
        <Nested
          circles={AttendanceData}
          sx={{
            bgColor: "#cbd5e1",
            fontWeight: "bold",
            fontFamily: "Trebuchet MS",
            strokeLinecap: "round",
            loadingTime: 1000,
            valueAnimation: true,
            intersectionEnabled: true,
          }}
        />
      </div>

      {/* Attendance Data */}
      <div className="flex justify-between w-full mt-4">
        {/* Students */}
        <div className="flex flex-col items-center">
          <h4 className="text-gray-500 text-sm">Students</h4>
          <p className="text-xl font-bold text-gray-800">
            {studentAttendance}%
          </p>
        </div>

        {/* Teachers */}
        <div className="flex flex-col items-center">
          <h4 className="text-gray-500 text-sm">Teachers</h4>
          <p className="text-xl font-bold text-blue-500">
            {teacherAttendance}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceGraph;
