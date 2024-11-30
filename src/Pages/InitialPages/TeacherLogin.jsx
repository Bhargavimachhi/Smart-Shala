import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const HandleTeacherSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request
      const res = await axios.post("http://localhost:3000/login/teacher", {
        email,
        password,
      });

      // Update teacherAuth state with response data
      setAuth({
        id: res.data.teacher._id,
        token: res.data.jwt_token_teacher,
        role: "teacher",
      });
      navigate("/teacher");
    } catch (error) {
      console.error(
        "Error during teacher login:",
        error.response?.data || error.message
      );
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <form className="w-full max-w-lg" onSubmit={HandleTeacherSubmit}>
          <h2 className=" -ml-5">Teacher Login</h2>
          <hr className="mb-4 -ml-5" />
          <div className="flex flex-wrap -mx-3 mb-6"></div>

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
              placeholder="Enter password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="before:ease relative h-12 w-40 overflow-hidden border rounded-md border-green-500 bg-blue-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-500 hover:before:-translate-x-40"
          >
            Submit
          </button>
        </form>

        {/* Display teacherAuth state */}
        {/* <p>{JSON.stringify(teacherAuth)}</p> */}
      </div>
    </>
  );
};

export default TeacherLogin;
