import React from "react";
import { AiOutlineStar } from "react-icons/ai"; 
import { BsThreeDots } from "react-icons/bs"; 

const NotificationCard = ({ title, description, time }) => {
  return (
    <div className="flex items-center justify-between p-2 mb-2 border-b-2 hover:shadow-sm transition-shadow duration-200">
      {/* Checkbox and Content */} 
     
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>

      {/* Time and Actions */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-400 text-sm">{time}</span>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <AiOutlineStar className="w-5 h-5 text-yellow-500" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <BsThreeDots className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
