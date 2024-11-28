// import { createContext, useContext, useState } from "react";

// // Create context
// const AuthContext = createContext();

// // AuthProvider component
// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     email: null,
//     token: "",
//   });

//   // Return the Provider with the value
//   return (
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to access auth context
// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };




import  { createContext, useContext, useState, useEffect } from "react";

// Define the initial state and context
const AuthContext = createContext([null, () => {}]); // Default value to prevent undefined issues

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Load initial state from localStorage if available
    const savedAuth = JSON.parse(localStorage.getItem("auth"));
    return savedAuth || { email: null, token: "" };
  });

  useEffect(() => {
    // Persist auth state to localStorage whenever it changes
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };

