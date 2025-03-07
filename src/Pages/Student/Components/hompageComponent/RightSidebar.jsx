import React from "react";
import CalendarComponent from "./CalendarComponent";
import TimeTable from "./TimeTable";

const RightSidebar = () => {
  return (
    <div className="sticky top-0 right-0 w-auto p-2 ml-16 overflow-x-auto shadow-lg md:border md:h-screen md:ml-0 md:border-l-btn">
      {/* Your content here */}
      <div className="text-2xl font-semibold text-text">Calendar</div>
      <hr className="mb-4 border border-b-btn" />

      <div className="mt-4">
        <CalendarComponent />
        {/* Calendar or any other content for the sticky right sidebar */}
      </div>
      <div className="mt-6 text-2xl font-semibold text-text">Class Schedule</div>
      <hr className="mb-4 border border-b-btn" />

      <div className="mt-4">
        <TimeTable />
      </div>
    </div>
  );
};

export default RightSidebar;
