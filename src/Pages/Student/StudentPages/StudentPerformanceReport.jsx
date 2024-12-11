import React, { useState } from 'react';
import LeftSideNavbar from '../Components/LeftSideNavBar';
import PerfComMain from '../Components/performanceRepoComponent/PerfComMain';
import EvaluateTestComponent from '../Components/performanceRepoComponent/EvaluateTestComponent';
import RightSideBar from '../Components/performanceRepoComponent/RightSideBar';
import EvaluationGSA from '../Components/performanceRepoComponent/EvaluationGSA';

const StudentPerformanceReport = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overall performance');

  const uploadedFiles = [
    { id: '1', name: '../Components/performanceRepoComponent/files/MPLC material.pdf' },
    { id: '2', name: '../Documents/Homework.docx' },
    { id: '3', name: '../Downloads/Sample Assignment.pdf' },
  ];

  const handleToggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="flex">
      <LeftSideNavbar isExpanded={isExpanded} toggleSidebar={handleToggleSidebar} />
      <div
        className={`flex-1 transition-width duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      >
        <div className={`flex ${activeTab === 'evaluate test' ? '' : 'flex-col'}`}>
          <div className={`flex-grow p-6 ${activeTab === 'evaluate test' ? 'w-3/4' : 'w-full'}`}>
            <PerfComMain activeTab={activeTab} setActiveTab={setActiveTab} />
           
            <div className="mt-6">
              {activeTab === 'overall performance' && (
                <h2 className="text-xl text-center">Overall Performance Section</h2>
              )}
              {activeTab === 'evaluate test' && <EvaluateTestComponent />}
             
              {activeTab === 'test results' && (
                <h2 className="text-xl text-center">Test Results Section</h2>
              )} 
              {activeTab === 'evaluate test' && (
                <div className="block">
                  <EvaluationGSA />
                </div>
              )}
            </div>
          </div>
          <div className='block'> 
          </div>
        
          {activeTab === 'evaluate test' && (
            <div className="w-1/4">
              <RightSideBar uploadedFiles={uploadedFiles} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPerformanceReport;
