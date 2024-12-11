// EvaluationGSA.js
import React, { useState } from 'react';

const EvaluationGSA = () => {
  const [selectedTab, setSelectedTab] = useState('grammar mistakes');

  return (
    <>
      <div className="p-4 rounded-lg border-b-2 flex gap-4 m-5">
        <button
          onClick={() => setSelectedTab('grammar mistakes')}
          className={`cursor-pointer px-4 py-2 text-lg ${
            selectedTab === 'grammar mistakes'
              ? 'text-blue-600 border-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          Grammar Mistakes
        </button>
        <button
          onClick={() => setSelectedTab('spelling mistakes')}
          className={`cursor-pointer px-4 py-2 text-lg ${
            selectedTab === 'spelling mistakes'
              ? 'text-blue-600 border-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          Spelling Mistakes
        </button>
        <button
          onClick={() => setSelectedTab('answer evaluation')}
          className={`cursor-pointer px-4 py-2 text-lg ${
            selectedTab === 'answer evaluation'
              ? 'text-blue-600 border-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          Answer Evaluation
        </button>
      </div>

      {/* Display content based on the selectedTab */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        {selectedTab === 'grammar mistakes' && (
          <p className="text-gray-700 text-lg">
            This section displays detailed information about grammar mistakes in the text.
          </p>
        )}
        {selectedTab === 'spelling mistakes' && (
          <p className="text-gray-700 text-lg">
            This section highlights spelling mistakes and suggests corrections.
          </p>
        )}
        {selectedTab === 'answer evaluation' && (
          <p className="text-gray-700 text-lg">
            This section evaluates the answers and provides feedback for improvement.
          </p>
        )}
      </div>
    </>
  );
};

export default EvaluationGSA;
