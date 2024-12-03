import React from "react";

const DaysOfWeek = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-700 mb-4 border-b-2 border-gray-100 p-4 ">
      {days.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
};

export default DaysOfWeek;
