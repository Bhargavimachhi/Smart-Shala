import React from "react";
import { useNavigate } from "react-router-dom";

const PendingList = () => {
  const navigate = useNavigate();
  const Pending = [
    { id: 1, subject: "Maths", deadline: "2024-12-10", description: "Complete algebra homework" },
    { id: 2, subject: "English", deadline: "2024-12-12", description: "Write an essay on technology" },
    // Add more items as needed
  ];

  return (
    <div className="p-4 m-5">
      <h1 className="text-2xl font-bold mb-4 border-gray-100 border-b-2 p-2 text-center">
        Pending Homework
      </h1> 
      <ul className="space-y-4 mb-3">
        {Pending.map((pendingItem) => (
          <li
            key={pendingItem.id}
            className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => navigate("/student/pending-homework", { state: pendingItem })}
          >
            <h2 className="text-lg font-semibold">{pendingItem.subject}</h2>
            <p className="text-gray-600">Deadline: {pendingItem.deadline}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingList;
