import React from "react";

const HwSubmission = () => {
  // Simulated backend data, replace with MongoDB route later
  const studentData = [
    { id: 1, name: "Siddharth", email: "101@gmail.com" },
    { id: 2, name: "Bhargavi", email: "102@gmail.com" },
    { id: 3, name: "manush", email: "103@gmail.com" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">Student List</h1>

      <div className="space-y-4">
        {studentData.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between p-4 bg-white rounded shadow-md"
          >
            <div>
              <p className="text-lg font-medium">{student.name}</p>
              <p className="text-gray-600">email: {student.email}</p>
            </div>
            <span className="text-sm text-gray-500">checking Pending</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HwSubmission;
