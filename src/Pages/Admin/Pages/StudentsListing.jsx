import React from 'react';
import { Mail, Phone, MoreVertical, User, BookOpen, Database, Calendar } from 'lucide-react';
import {NavLink} from 'react-router-dom'
import { Card, CardContent, Typography, Dialog, DialogTitle, DialogContent,IconButton  } from '@mui/material';

import SideNavbar from '../../../components/SideNavbar';

import { useState,useEffect } from 'react';
import axios from 'axios';
import { Info as InfoIcon } from '@mui/icons-material';

const StudentsListingpage = () => {


  const [classrooms,setclassrooms] = useState([]);
  const [open, setOpen] = useState(false);

  // const classroomData = {
  //   name: "10th Grade Science",
  //   teachers: [
  //     { name: "Mrs. Johnson", subject: "Biology" },
  //     { name: "Mr. Rodriguez", subject: "Chemistry" }
  //   ],
  //   students: [
  //     { name: "Emma Wilson", grade: "A" },
  //     { name: "Alex Chen", grade: "B+" },
  //     { name: "Sophia Martinez", grade: "A-" },
  //     { name: "Ethan Kim", grade: "B" }
  //   ]
  // };

  const classroom = {
    name: "10th Grade Science",
    students: [
      "Emma Wilson",
      "Alex Chen", 
      "Sophia Martinez", 
      "Ethan Kim"
    ],
    teachers: [
      "Mrs. Johnson",
      "Mr. Rodriguez"
    ]
  };

  const handleOpenDetails = () => setOpen(true);
  const handleCloseDetails = () => setOpen(false);


  useEffect(()=>{


    async function getclassrooms(){
      const res = await axios.post("http://localhost:3000/getallclassrooms");

      console.log(res.data.classrooms);
      setclassrooms(res.data.classrooms);
    }

    getclassrooms();




  },[]);
  const students = [
    { name: 'James Bond', rollNo: 100, std: '5th', score: '95%' },
    { name: 'Ethan Hunt', rollNo: 101, std: '5th', score: '93%' },
    { name: 'John Wick', rollNo: 102, std: '5th', score: '91%' }
  ];

  const teachers = [
    { name: 'Mrs. Johnson', subject: 'Biology' },
    { name: 'Mr. Rodriguez', subject: 'Chemistry' }
  ];



    
  return (
  <>
  <div className="flex min-h-screen bg-gray-100">
     <SideNavbar/>

   
      <div className="flex-1 p-8">

      <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Your Classrooms</h1>
          <p className="text-gray-600">Comprehensive overview of your classrooms</p>
        </div>
     
      

        {classrooms && classrooms.length > 0 ? (
          <>
     

      {
        classrooms?.map((classroom) =>{

          return(

         <>
            <Card className="relative">
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" className="font-bold text-blue-600">
            {classroom.name}
          </Typography>
          <IconButton color="primary" className="absolute top-2 right-2">
            <InfoIcon />
          </IconButton>
        </div>

        <div className="mb-4">
          <Typography variant="h6" className="text-gray-700 mb-2">
            Students
          </Typography>
          <div className="space-y-1">
          <>
               <div className="mb-6">
     
            <table className="w-full shadow-sm rounded-md">
              <thead>
                <tr className="bg-gray-100">
                
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Roll No</th>
                  
                </tr>
              </thead>
              <tbody>
               
                  <tr
                 
                    className="hover:bg-gray-200 transition duration-150"
                  >
                    
                    <td className="py-2 px-4">Bhargavi</td>
                    <td className="py-2 px-4">22038</td>
                   
                  </tr>
              
              </tbody>
            </table>
          </div>
              
              </>
          </div>
        </div>

        <div>
          <Typography variant="h6" className="text-gray-700 mb-2">
            Teachers
          </Typography>
          <div className="space-y-1">
          <>
               <div className="mb-6">
     
            <table className="w-full shadow-sm rounded-md">
              <thead>
                <tr className="bg-gray-100">
                
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Roll No</th>
                  
                </tr>
              </thead>
              <tbody>
               
                  <tr
                 
                    className="hover:bg-gray-200 transition duration-150"
                  >
                    
                    <td className="py-2 px-4">Sukuna</td>
                    <td className="py-2 px-4">22038heufh</td>
                   
                  </tr>
              
              </tbody>
            </table>
          </div>
              
              </>
           
          </div>
        </div>
      </CardContent>
    </Card>
         </>
          );



        })
      }
      </>
    ) : (
      <>
       <div className="text-center mt-8">
          <p className="text-gray-500">No classrooms found available.</p>
        </div>
      
      
      </>

    )}
    
      
      </div>
    </div>
  </>
  )
}

export default StudentsListingpage;