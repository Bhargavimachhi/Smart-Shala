import { createContext, useContext, useState, useEffect } from "react";

// Define the initial state and context for Student
const StudentContext = createContext([null, () => {}]);

// StudentProvider component
const StudentProvider = ({ children }) => {
  const [studentAuth, setStudentAuth] = useState(() => {
    // Load initial state for student from localStorage
    const savedStudentAuth = JSON.parse(localStorage.getItem("studentAuth"));
    return savedStudentAuth || { email: null,id:'', token: "",role:'' };
  });

  useEffect(() => {
    // Persist student auth state to localStorage whenever it changes
    localStorage.setItem("studentAuth", JSON.stringify(studentAuth));
  }, [studentAuth]);

  return (
    <StudentContext.Provider value={[studentAuth, setStudentAuth]}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook to access the StudentContext
const useStudentAuth = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentAuth must be used within a StudentProvider");
  }
  return context;
};

export { useStudentAuth, StudentProvider };
