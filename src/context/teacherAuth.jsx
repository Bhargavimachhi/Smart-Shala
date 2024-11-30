import { createContext, useContext, useState, useEffect } from "react";

// Define the initial state and context for Teacher
const TeacherContext = createContext([null, () => {}]);

// TeacherProvider component
const TeacherProvider = ({ children }) => {
  const [teacherAuth, setTeacherAuth] = useState(() => {
    // Load initial state for teacher from localStorage
    const savedTeacherAuth = JSON.parse(localStorage.getItem("teacherAuth"));
    return savedTeacherAuth || { email: null, token: "" ,role:''};
  });

  useEffect(() => {
    // Persist teacher auth state to localStorage whenever it changes
    localStorage.setItem("teacherAuth", JSON.stringify(teacherAuth));
  }, [teacherAuth]);

  return (
    <TeacherContext.Provider value={[teacherAuth, setTeacherAuth]}>
      {children}
    </TeacherContext.Provider>
  );
};

// Custom hook to access the TeacherContext
const useTeacherAuth = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useTeacherAuth must be used within a TeacherProvider");
  }
  return context;
};

export { useTeacherAuth, TeacherProvider };
