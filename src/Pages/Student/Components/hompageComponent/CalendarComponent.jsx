import React,{useState} from 'react' 
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
function CalendarComponent() {
    const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  return ( 
    
    <div>
      {/* Calendar Component */}
      <div className="mt-1">
        <div className=" p-4">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="react-calendar"
          />
        </div>
      </div>
    </div>
  )
}

export default CalendarComponent
