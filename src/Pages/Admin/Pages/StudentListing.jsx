import { Card, CardContent } from "@mui/material";
import SideNavbar from "../../../components/SideNavbar";
import { useState, useEffect } from "react";
import axios from "axios";

import UniStudentCard from "../../Student/Components/UniStudentCard.jsx/UniStudentCard";
const StudentListingpage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  // Thiss useEffect hookk willl try to preload the data from the server before rendering the screen.
  useEffect(() => {
    async function fetchStudents() {
      // const res = await axios.get(`http://localhost:3000/admin/${savedAuth.id}/students`);
      const res = await axios.get(`http://localhost:3000/admin/students`);

      console.log(res.data.students);
      setStudents(res.data.students);
      setLoading(false);
    }
    fetchStudents();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading Students...</div>;
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <SideNavbar />
        {/* new ui siddhart */}
        <div className="flex-1 p-8">
          <h1 className="text-xl font-semibold font-sans ">Student List</h1>
          <div className="w-full mt-5 h-screen p-3 overflow-hidden bg-gray-300 rounded-md">
            <div
              id="filte bar"
              className="w-full h-50 rounded-sm  bg-white p-5"
            ></div>
            <div className="w-full h-full mt-3 rounded-sm bg-gray-500 mb-6 ">
              <div className="pt-10">
                {students.map((student) => {
                  return (
                    <>
                      <UniStudentCard
                        key={student}
                        id={student._id}
                        name={student.name}
                        email={student.email}
                      />
                    </>
                  );
                })}

                {/* <UniStudentCard name="hello"/>
<UniStudentCard name="hello"/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentListingpage;
