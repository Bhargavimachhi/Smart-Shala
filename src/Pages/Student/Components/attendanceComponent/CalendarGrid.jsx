import React from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";

const CalendarGrid = ({ currentDate, attendance }) => {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start, end });
  const startDay = getDay(start);
  const emptyDays = Array.from({ length: startDay });

  return (
    <div className="grid grid-cols-7 gap-2">
      {/* Empty cells for alignment */}
      {emptyDays.map((_, index) => (
        <div key={`empty-${index}`} />
      ))}

      {/* Calendar Dates */}
      {daysInMonth.map((date) => {
        const dateKey = format(date, "yyyy-MM-dd");
        const status = attendance[dateKey];
        return (
          <div
            key={dateKey}
            className={`h-20 rounded-lg flex flex-col items-center justify-center text-m ${
              status === "Present"
                ? "bg-green-100 text-green-700 border border-green-200"
                : status === "Absent"
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-white text-gray-700 border border-gray-100"
            }`}
          >
            <div className="font-semibold">{format(date, "d")}</div>
            {status && (
              <div className="text-xs mt-1 font-medium">{status}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
