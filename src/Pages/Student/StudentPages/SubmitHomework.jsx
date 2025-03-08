import React, { useState } from "react";
import LeftSideNavbar from "../Components/LeftSideNavBar";
import PendingList from "../Components/submitHWComponent/PendingList";

const SubmitHomework = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [submittedHomework, setSubmittedHomework] = useState([]); // Initialize as an empty array

  const handleToggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="flex flex-wrap">
      <LeftSideNavbar
        isExpanded={isExpanded}
        toggleSidebar={handleToggleSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          isExpanded ? "ml-56" : "ml-16"
        } p-4 mr-50 overflow-x-auto min-h-screen`}
      >
        {/* <div className="justify-between gap-6">
          <SubmitHWmainBox onFileupload={handleFileUpload} /> 
          
        </div>   */}
        <div>
          <PendingList />
        </div>
      </div>
    </div>
  );
};

export default SubmitHomework;
