import React from "react";
import { ICONS } from "../../Icons/icons";

const PerfComMain = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-4 p-2 border-b-2">
      {/* <button
        onClick={() => setActiveTab('overall performance')}
        className={`cursor-pointer px-4 py-2 text-lg ${
          activeTab === 'overall performance'
            ? 'text-sky-800 border-b-2 border-sky-800'
            : 'text-gray-600'
        }`}
      >
        Overall Performance
      </button> */}
      <button
        onClick={() => setActiveTab("evaluate test")}
        className={`cursor-pointer p-2 justify-start flex items-center gap-2 text-2xl text-text font-semibold ${
          activeTab === "evaluate test"
            ? "text-sky-800 border-b-2 border-btn font-bold text-2xl"
            : "text-text"
        }`}
      >
        <span>Evaluate</span>
        <span>
          <ICONS.DOCUMENT size={25} />
        </span>
      </button>
      {/* <button
        onClick={() => setActiveTab('test results')}
        className={`cursor-pointer px-4 py-2 text-lg ${
          activeTab === 'test results'
            ? 'text-sky-800 border-b-2 border-sky-800'
            : 'text-gray-600'
        }`}
      >
        Test Result
      </button> */}
    </div>
  );
};

export default PerfComMain;
