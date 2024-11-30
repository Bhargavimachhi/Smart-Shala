import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, subMonths, addMonths } from "date-fns";
import Header from "./Header";
import NavigationControls from "./NavigationControls";
import DaysOfWeek from "./DaysOfWeek";
import CalendarGrid from "./CalendarGrid";

const MainAtComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock attendance data
  const attendance = {
    "2024-11-01": "Present",
    "2024-11-02": "Absent",
    "2024-11-03": "Present",
    "2024-11-05": "Absent",
    "2024-11-07": "Present",
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header title="Attendance Report" />
      <div className="bg-white rounded-lg p-6 w-full mt-6">
        <NavigationControls
          currentDate={currentDate}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
        <DaysOfWeek />
        <CalendarGrid currentDate={currentDate} attendance={attendance} />
      </div>
    </div>
  );
};

export default MainAtComponent;
