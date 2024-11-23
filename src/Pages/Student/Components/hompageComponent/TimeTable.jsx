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
    <div className="bg-white p-4 rounded-lg  mt-6">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="px-4 py-2 border ">Day</th>
            <th className="px-4 py-2 border ">Subject</th>
            <th className="px-4 py-2 border ">Time</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(timetable).map(([day, classes]) => (
            <tr key={day}>
              <td className="px-4 py-2 border font-semibold">{day}</td>
              <td className="px-4 py-2 border">
                <ul>
                  {classes.map((cls, index) => (
                    <li key={index}>{cls.subject}</li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 border">
                <ul>
                  {classes.map((cls, index) => (
                    <li key={index}>{cls.time}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
