import React from "react";
import UnitTestBox from "./UnitTestBox";

const UnitTestBoxContainer = ({ isExpanded }) => {
  return (
    <div
      className={`rounded-lg  p-5 transition-all duration-300 overflow-hidden mt-10 mb-4  ml-${
        isExpanded ? "ml-64" : "ml-16"}`}
    >
      <h1 className="text-2xl font-bold mb-3">Unit Test Results</h1>

      {/* Container to hold UnitTestBox components horizontally */}
      <div className="flex flex-row gap-6 overflow-x-auto">
        <UnitTestBox position="relative" title="Mathematics"/>
        <UnitTestBox position="relative" title="Science" />
        <UnitTestBox position="relative" title="English" />
      </div>
    </div>
  );
};

export default UnitTestBoxContainer;
