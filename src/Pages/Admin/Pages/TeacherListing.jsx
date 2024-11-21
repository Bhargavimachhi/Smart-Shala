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

      const res = await axios.get("http://localhost:3000/getallstudent");

      console.log(res.data.allUser);
      setTeachers(res.data.allUser);
      setLoading(false);
    }
    fetchTeachers();

  },[]);

  if (loading) {
    return <div className="text-center mt-8">Loading Teachers...</div>;
  }

    // const teachers = [
    //     {
    //       id: 1,
    //       name: "Itadori",
    //       subjects: ["Mathematics", "Physics", "Computer"],
    //       image: "https://th.bing.com/th?id=OIP.RN9YBharTO8gPqAsNqtReAHaHa&w=249&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    //     },
    //     {
    //       id: 2,
    //       name: "Gojo",
    //       subjects: ["Mathematics", "Physics", "Computer"],
    //       image: "https://th.bing.com/th?id=OIP.ugb3vQqhtCQYNyOpU54CRwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    //     },
    //     {
    //       id: 3,
    //       name: "Kakashi",
    //       subjects: ["Mathematics", "Physics", "Computer"],
    //       image: "https://th.bing.com/th?id=OSK.mmcolfSzSahwzdn0_KjPY29A_BIQ3qktfk6d6E44Q-Ik22Eg&w=76&h=100&c=8&o=6&dpr=1.3&pid=SANGAM"
    //     },
    //     {
    //       id: 4,
    //       name: "Capt Levi",
    //       subjects: ["Mathematics", "Physics", "Computer"],
    //       image: "https://th.bing.com/th?id=OIP.l5Zgutq1cRRzDZ5AROYxJwHaNJ&w=187&h=333&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    //     },
    //     {
    //       id: 5,
    //       name: "Erwin Smith",
    //       subjects: ["Mathematics", "Physics", "Computer"],
    //       image: "https://th.bing.com/th?id=OIP.MVmMdVG1ormMulsZzY7K3wHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    //     },
    //     {
    //       id: 6,
    //       name: "Zoro",
    //       subjects: ["Mathematics", "Physics", "Computer"],
    //       image: "https://th.bing.com/th?id=OIP.HkxDftcu901JEpHbQHXpiQHaH-&w=240&h=259&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    //     }
    //   ];




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
      </div>
    </div>


    
    </>
  )
}

export default TeacherListingpage