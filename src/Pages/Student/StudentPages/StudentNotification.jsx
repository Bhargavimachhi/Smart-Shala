import React, { useState } from "react";
import LeftSideNavbar from "../Components/LeftSideNavBar";
import "../css/rawcss.css";
import MainNavNotifyCompo from "../Components/studentNotifyComponent/MainNavNotifyCompo";
const StudentNotification = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="flex flex-wrap">
      {/* Left Sidebar */}
      <LeftSideNavbar
        isExpanded={isExpanded}
        toggleSidebar={handleToggleSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      > 

{/* Main Content */}
   <div className="justify-between gap-6">
   <MainNavNotifyCompo/>
  </div>

      </div>
    </div>
  );
};

export default StudentNotification;
