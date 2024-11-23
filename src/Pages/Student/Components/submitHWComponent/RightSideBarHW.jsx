import React from "react";
import { RiFileTextLine, RiCheckLine } from "react-icons/ri"; // Import icons

const RightSidebarHW = () => {
  // Sample data for submitted and approved homework
  const submittedHomework = [
    "English Paper",
    "Maths Worksheet",
    "Science Project",
    "History Essay",
  ];
  const approvedHomework = ["English Paper", "Maths Worksheet"];

  return (
    <div className=" w-64 p-4  border-2 border-gray-100 h-screen ">
      <h2 className="text-xl font-bold mb-4">Homework Status</h2>

      {/* Submitted Homework Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Submitted</h3>
        <div className="flex flex-col space-y-2">
          {submittedHomework.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-3 rounded-lg shadow-sm"
            >
              <RiFileTextLine className="text-blue-500 mr-3" size={24} />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Approved Homework Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Approved</h3>
        <div className="flex flex-col space-y-2">
          {approvedHomework.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-green-300 p-3 rounded-lg shadow-sm"
            >
              <RiCheckLine className="text-green-700 mr-3" size={24} />
              <span className="text-gray-800 text-m">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebarHW;
