import React, { useEffect } from "react";
import TeacherLeftSideNavBar from "../Components/TeacherLeftSideNavBar";
import { useTeacherAuth } from "../../../context/teacherAuth";
import { useNavigate } from "react-router-dom";

const TeacherHomePage = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [teacherAuth] = useTeacherAuth(); // Assuming this is a context hook
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);
  };

  // Handle navigation if user is not authenticated or not a teacher
  useEffect(() => {
    if (!teacherAuth?.token || teacherAuth.role !== "teacher") {
     
     
      navigate("/teacher/login", { replace: true }); // `replace` avoids adding this to browser history
    }
  }, [teacherAuth, navigate]);

  // Render the component
  if (!teacherAuth?.token || teacherAuth.role !== "teacher") {
    return null; // Avoid rendering anything while redirecting
  }

  {console.log("this is context auth" , teacherAuth);
  }
  return (
    
    <div className="flex min-h-screen bg-gray-100">
    {/* <h1>{JSON.stringify(teacherAuth)}</h1> */}
      <TeacherLeftSideNavBar
        isExpanded={isExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 p-8 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center">
          Welcome to the Teacher Portal
        </h1>
      </div>
    </div>
  );
};

export default TeacherHomePage;
