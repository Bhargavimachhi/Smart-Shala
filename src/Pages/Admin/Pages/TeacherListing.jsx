import { Card,CardContent } from "@mui/material"
import SideNavbar from "../../../components/SideNavbar";
import { useState,useEffect } from "react";
import axios from "axios";
import Teacherprofile from "../../../components/Teacherprofile";
const TeacherListingpage = () => {



  
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);


// Thiss useEffect hookk willl try to preload the data from the server before rendering the screen.
  useEffect(()=>{

    async function fetchTeachers(){

      const res = await axios.get("http://localhost:3000/getallteachers");

      console.log(res.data.teachers);
      setTeachers(res.data.teachers);
      setLoading(false);
    }
    fetchTeachers();

  },[]);

  if (loading) {
    return <div className="text-center mt-8">Loading Teachers...</div>;
  }

 


  return (
    <>

<div className="flex min-h-screen bg-gray-100">
   <SideNavbar/>
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Teacher</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Create +
          </button>
        </div>

        {teachers && teachers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers?.map((teacher) => (
            <Card key={teacher.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  
                  <h3 className="text-lg font-semibold mb-2">{teacher.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">Teacher</p>
                  <div className="flex gap-2 mb-4">
                    {teacher.subjects?.map((subject, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-600"
                      >
                        {subject}
                        {index < teacher.subjects.length - 1 && " • "}
                      </span>
                    ))}
                  </div>
                  <Teacherprofile Teachers={teacher} />
                  
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        ) : (
          <div className="text-center mt-8">No teacher found</div>
        )}
      </div>
    </div>


    
    </>
  )
}

export default TeacherListingpage