import React from "react";
import CalendarComponent from "./CalendarComponent"
import TimeTable from "./TimeTable";

const RightSidebar = () => {
  return (
    <div className="sticky top-0 right-0 h-screen p-4 w-auto min-w-50 max-w-81 shadow-lg overflow-x-auto ">
      {/* Your content here */}
      <div className="text-xl font-bold">Calendar</div>
      <div className="mt-4"> 
        <CalendarComponent/>
        {/* Calendar or any other content for the sticky right sidebar */}
        
      </div> 
      <div className="text-xl font-bold mt-6">Class Schedule</div>
     
      <div className="mt-4"> 
        <TimeTable/>
      
      </div>
    </div>
  );
};

export default RightSidebar;
