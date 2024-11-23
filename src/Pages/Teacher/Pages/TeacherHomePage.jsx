import React from 'react';
import TeacherLeftSideNavBar from '../Components/TeacherLeftSideNavBar';

const TeacherHomePage = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherLeftSideNavBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-8 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center">Welcome to the Teacher Portal</h1>
      </div>
    </div>
  );
};

export default TeacherHomePage;