import React from 'react';

const PerfComMain = ({ activeTab, setActiveTab }) => {
  return (
    <div className="p-4 rounded-lg shadow-md flex gap-4">
      <button
        onClick={() => setActiveTab('overall performance')}
        className={`cursor-pointer px-4 py-2 text-lg ${
          activeTab === 'overall performance'
            ? 'text-blue-600 border-2 border-blue-600'
            : 'text-gray-600'
        }`}
      >
        Overall Performance
      </button>
      <button
        onClick={() => setActiveTab('evaluate test')}
        className={`cursor-pointer px-4 py-2 text-lg ${
          activeTab === 'evaluate test'
            ? 'text-blue-600 border-2 border-blue-600'
            : 'text-gray-600'
        }`}
      >
        Evaluate
      </button>
      <button
        onClick={() => setActiveTab('test results')}
        className={`cursor-pointer px-4 py-2 text-lg ${
          activeTab === 'test results'
            ? 'text-blue-600 border-2 border-blue-600'
            : 'text-gray-600'
        }`}
      >
        Test Result
      </button>
    </div>
  );
};

export default PerfComMain;
