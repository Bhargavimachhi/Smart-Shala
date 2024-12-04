import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, subMonths, addMonths } from "date-fns";
import Header from "./Header";
import NavigationControls from "./NavigationControls";
import DaysOfWeek from "./DaysOfWeek";
import CalendarGrid from "./CalendarGrid";
import axios from "axios";
import { useEffect } from "react";

const MainAtComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const savedAuth = JSON.parse(localStorage.getItem("auth"));
  const [student,setStudent] = useState(null);
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    useEffect(()=>{
        async function getstudents(){
          try{
            const res = await axios.get(`http://localhost:3000/student/${savedAuth.id}`);
            setStudent(res.data.student);
          }catch(err) {
            console.log(err);
          }
            
        }
        getstudents();
    },[]);

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
        <CalendarGrid currentDate={currentDate} 
                      presentDays={student && student.presentDays ? student.presentDays : []} 
                      absentDays={student && student.absentDays ? student.absentDays : []}/>
      </div>
    </div>
  );
};

export default MainAtComponent;
