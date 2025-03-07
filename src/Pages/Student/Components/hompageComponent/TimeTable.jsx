import React from "react";

const TimeTable = () => {
  const timetable = {
    Monday: [
      { subject: "Mathematics", time: "9:00 AM" },
      { subject: "Science", time: "10:30 AM" },
      { subject: "Gujarati", time: "12:00 PM" },
    ],
    Tuesday: [
      { subject: "S.S", time: "9:00 AM" },
      { subject: "Maths", time: "10:30 AM" },
      { subject: "Painting", time: "12:00 PM" },
    ],
    Wednesday: [
      { subject: "Science", time: "9:00 AM" },
      { subject: "English", time: "10:30 AM" },
      { subject: "Horse Riding", time: "12:00 PM" },
    ],
    Thursday: [
      { subject: "Art", time: "9:00 AM" },
      { subject: "Grammar", time: "10:30 AM" },
      { subject: "Hindi", time: "12:00 PM" },
    ],
    Friday: [
      { subject: "English", time: "9:00 AM" },
      { subject: "Science", time: "10:30 AM" },
      { subject: "PE", time: "12:00 PM" },
    ],
    Saturday: [
      { subject: "S.S", time: "9:00 AM" },
      { subject: "Maths", time: "10:30 AM" },
    ],
  };

  return (
    <div className="p-4 mt-6 overflow-x-auto bg-white rounded-lg">
      <table className="w-full min-w-max">
        <thead className="text-btn">
          <tr className="">
            <th className="px-4 py-2 border text-start">Day</th>
            <th className="px-4 py-2 border text-start">Subject</th>
            <th className="px-4 py-2 border text-start">Time</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(timetable).map(([day, classes]) => (
            <tr key={day}>
              <td className="px-4 py-2 font-semibold border">{day}</td>
              <td className="px-4 py-2 border">
                {classes.map((cls, index) => (
                  <div key={index}>{cls.subject}</div>
                ))}
              </td>
              <td className="px-4 py-2 border">
                {classes.map((cls, index) => (
                  <div key={index}>{cls.time}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
