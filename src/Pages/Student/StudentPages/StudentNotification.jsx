import React from "react";
import "../css/rawcss.css";
import MainNavNotifyCompo from "../Components/studentNotifyComponent/MainNavNotifyCompo";
const StudentNotification = () => {

  return (
    <div className="flex flex-wrap w-full">
      {/* Main Content */}
      <div className="justify-between gap-6 w-full">
        <MainNavNotifyCompo />
      </div>
    </div>
  );
};

export default StudentNotification;
