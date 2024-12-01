import React ,{useState}from 'react'
import LeftSideNavbar from '../Components/LeftSideNavBar';
import MainAtComponent from '../Components/attendanceComponent/MainAtComponent';
const StudentAttendancePage = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggleSidebar = () => {
        setIsExpanded((prevState) => !prevState);
      };
  return (
    <>
        <LeftSideNavbar
        isExpanded={isExpanded}
        toggleSidebar={handleToggleSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ml-${
          isExpanded ? "64" : "16"
        } p-6 mr-50 overflow-x-auto`}
      >
        <MainAtComponent/>
      </div>
    </>
  )
}

export default StudentAttendancePage
