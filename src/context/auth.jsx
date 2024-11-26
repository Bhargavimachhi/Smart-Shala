import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: null,
    token: "",
  });

  // Return the Provider with the value
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
