import React from "react";
import { format } from "date-fns";

const NavigationControls = ({ currentDate, onPrev, onNext }) => {
  return (
    <div className="flex justify-between items-center mb-4 ">
      <button
        onClick={onPrev}
        className="bg-blue-50 px-3 py-2 rounded-lg text-gray-800 hover:bg-gray-300"
      >
        &lt;
      </button>
      <h2 className="text-lg font-semibold text-blue-700 ">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <button
        onClick={onNext}
        className="bg-blue-50 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300"
      >
        &gt;
      </button>
    </div>
  );
};

export default NavigationControls;
