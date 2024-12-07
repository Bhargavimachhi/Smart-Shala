import React, { useState } from "react";
import "../css/HWManage.css";
import "../css/HoLeftNavBar.css";
import TeacherLeftSideNavBar from "../Components/TeacherLeftSideNavBar";
import HWListComponent from "../Components/HWListComponent";
import { useNavigate } from "react-router-dom";

const HomeWorkManage = () => {
  // Dummy homework data
  const homeworkData = [
    {
      id: "1234455",
      subject: "Maths1",
      title: "Chapter 1 should be completed",
      description: "Do it properly",
      dueDate: "7/12/24",
    },
    {
      id: "1234456",
      subject: "Maths2",
      title: "Chapter 2 should be completed",
      description: "Practice questions 1 to 10",
      dueDate: "8/12/24",
    },
    {
      id: "12344575",
      subject: "Maths3",
      title: "Chapter 3 should be completed",
      description: "Solve the exercises",
      dueDate: "9/12/24",
    },
    {
      id: "1234457",
      subject: "Maths3",
      title: "Chapter 3 should be completed",
      description: "Solve the exercises",
      dueDate: "9/12/24",
    },
    {
      id: "12344571",
      subject: "Maths3",
      title: "Chapter 3 should be completed",
      description: "Solve the exercises",
      dueDate: "9/12/24",
    },
    {
      id: "12344572",
      subject: "Maths3",
      title: "Chapter 3 should be completed",
      description: "Solve the exercises",
      dueDate: "9/12/24",
    },
    {
      id: "12344573",
      subject: "Maths3",
      title: "Chapter 3 should be completed",
      description: "Solve the exercises",
      dueDate: "9/12/24",
    },
    {
      id: "12344574",
      subject: "Maths3",
      title: "Chapter 3 should be completed",
      description: "Solve the exercises",
      dueDate: "9/12/24",
    },
  ];

  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => setSidebarExpanded(!isSidebarExpanded);
const navigate = useNavigate()
  const NavigateToStudents = (e)=>{
    // navigate("/teacher/homework/studentsubmissions");
    
    


    



  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <TeacherLeftSideNavBar
        isExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div
        className={`flex-1 bg-gray-200 p-6 transition-width duration-300 ${
          isSidebarExpanded ? "ml-64" : "ml-16"
        }`}
      >
        <div className="bg-white rounded shadow-lg w-full min-h-[600px] p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-semibold text-xl">Add Homework</h1>
            <button
              type="button"
              className="bg-blue-500 text-white font-bold text-base px-8 py-3 rounded shadow-md hover:shadow-lg transition duration-150"
            >
              Add Homework +
            </button>
          </div>
          <hr className="mb-6" />

          {/* Homework List */}
          <div className=" h-screen overflow-y-hidden " onClick={NavigateToStudents}>
            {homeworkData.map((hw) => (
              <HWListComponent
              
              
                key={hw.id}
                name={hw.subject}
                description={hw.description}
                dueDate={hw.dueDate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWorkManage;
