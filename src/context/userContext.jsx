import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { reducer } from "../reducer/UserReducer";


const UserContext = createContext();

const initialState = {
  isLoading: false,
  userData: [],
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  const getUserDetails = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
        const response = await axios.get(
          `http://localhost:3000/${savedAuth.role}/${savedAuth.id}`
        );
        const User = response.data[savedAuth.role];
        dispatch({ type: "SET_USER_DATA", payload: User });
    } catch (error) {
      console.log("Can't fetch user Data");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <UserContext.Provider
      value={{ ...state, getUserDetails}}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { useUserContext, UserProvider };
