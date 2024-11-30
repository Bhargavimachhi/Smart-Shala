import React, { useState } from "react";
import axios from "axios";
import { useStudentAuth } from "../../context/studentAuth";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [studentAuth, setStudentAuth] = useStudentAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Student Login Submission
  const HandleStudentSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      // Make POST request to login endpoint
      const res = await axios.post("http://localhost:3000/login/student", {
        email,
        password,
      });

      console.log("Login successful:", res.data);

      // Update the studentAuth state with the response data
      setStudentAuth({
        ...studentAuth,
        email: res.data.student.email,
        token: res.data.jwt_token_student,
        role: res.data.student.role,
        id:res.data.student.id
        
      });


      navigate("/student")
    } catch (error) {
      console.error("Error during student login:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <form className="w-full max-w-lg" onSubmit={HandleStudentSubmit}>
          <h2 className=" -ml-5">Student Login</h2>
          <hr className="mb-4 -ml-5" />

          {/* Email */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-email"
              type="email"
              placeholder="abc@gmail.com"
            />
          </div>

          {/* Password */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-password"
              type="password"
              placeholder=""
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="relative h-12 w-40 overflow-hidden border rounded-md border-green-500 bg-blue-500 text-white shadow-2xl transition-all hover:shadow-gray-500"
          >
            Submit
          </button>
        </form>

        {/* Display Auth State */}
        {/* <h1>{JSON.stringify(studentAuth)}</h1> */}
      </div>
    </>
  );
};

export default StudentLogin;
