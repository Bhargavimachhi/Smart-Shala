import { Card, CardContent } from "@mui/material";
import SideNavbar from "../../../components/SideNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import StudentProfile from "../Components/Studentprofile";

const StudentListingpage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const savedAuth = JSON.parse(localStorage.getItem("auth"));

  // Thiss useEffect hookk willl try to preload the data from the server before rendering the screen.
  useEffect(() => {
    async function fetchStudents() {
      const res = await axios.get(`http://localhost:3000/admin/${savedAuth.id}/students`);
      

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
   <SideNavbar/>
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student</h1>
        </div>

        {students && students.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students?.map((student) => (
            <Card key={student.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  
                  <h2 className="text-lg font-semibold mb-2">{student.name}</h2>
                  <StudentProfile student={student} />
                  
                </div>
              </CardContent>
              {/* <button type="button">Performance</button> */}
            </Card>
          ))}
        </div>
        ) : (
          <div className="text-center mt-8">No student found</div>
        )}
      </div>
</div>
    </>
  );
};

export default StudentListingpage;
