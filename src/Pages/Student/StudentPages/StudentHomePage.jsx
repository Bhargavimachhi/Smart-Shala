import React, { useState } from "react";
import LeftSideNavbar from "../Components/LeftSideNavBar";
import UnitTestBoxContainer from "../Components/UnitTestBoxContainer";
import OnlineMeetSchedule from "../Components/OnlineMeetSchedule"; 
import '../css/rawcss.css'
import RightSidebar from "../Components/RightSidebar";

const HomePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="flex flex-wrap">
      {/* Left Sidebar */}
      <LeftSideNavbar isExpanded={isExpanded} toggleSidebar={handleToggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ml-${isExpanded ? "64" : "16"} p-6 mr-50 overflow-x-auto`}>
        <h1 className="text-2xl font-bold fontColorBlue mb-4  mt-5">Tomorrow will be a fantastic day for you, Cupie 😁—but only if you finish your homework today! </h1>
        <div className="justify-between gap-6">
          <UnitTestBoxContainer  />
          <OnlineMeetSchedule />
        </div>
      
      
      </div> 
      <RightSidebar/>
    </div>
  );
};

export default HomePage;
